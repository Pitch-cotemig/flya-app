const API_URL = "http://localhost:3000";

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface BagItem {
  id?: string;
  name: string;
  category: string;
  quantity: number;
  packed: boolean;
}

export interface TripBag {
  id: string;
  tripId: string;
  items: BagItem[];
  lastModified: string;
  progress: {
    total: number;
    checked: number;
    progress: number;
  };
}

export interface TripForBag {
  id: string;
  destination: string;
  duration: number;
  startDate?: string;
  endDate?: string;
  planResult: string;
  hasBag: boolean;
}

class BagsService {
  private getAuthHeaders() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Token de autenticação não encontrado.");
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  private handleAuthError(response: Response, data: any): ApiResponse<any> {
    if (response.status === 401) {
      localStorage.removeItem("authToken");
      return {
        success: false,
        message: "Sua sessão expirou. Faça login novamente.",
        data: null,
      };
    }
    return {
      success: false,
      message: data.message || "Erro na requisição",
      data: null,
    };
  }

  // Buscar todas as viagens do usuário para seleção
  async getUserTripsForBag(): Promise<ApiResponse<TripForBag[]>> {
    try {
      // Importar o tripsService dinamicamente para evitar dependência circular
      const { tripsService } = await import("./tripsService");

      // Buscar viagens do usuário usando o serviço existente
      const tripsResponse = await tripsService.findAll();

      if (!tripsResponse.success || !tripsResponse.data) {
        return {
          success: false,
          message: tripsResponse.message || "Erro ao buscar viagens",
          data: null,
        };
      }

      // Converter viagens para o formato TripForBag
      const tripsForBag: TripForBag[] = tripsResponse.data.map((trip) => {
        let destination = "Destino não identificado";
        let duration = 3;

        // Sempre extrair destino e duração do plan_result (mais confiável que prompt_data)
        destination = this.extractDestinationFromPlan(trip.plan_result);
        duration = this.extractDurationFromPlan(trip.plan_result);

        // Se não conseguiu extrair do plan_result, tentar prompt_data como fallback
        if (
          destination === "Destino não identificado" &&
          trip.prompt_data &&
          typeof trip.prompt_data === "object"
        ) {
          const promptData = trip.prompt_data as any;
          if (
            promptData.destination &&
            promptData.destination !== "Para o exterior" &&
            promptData.destination !== "Para alguma cidade Brasileira"
          ) {
            destination = promptData.destination;
          } else if (
            promptData.destino &&
            promptData.destino !== "Para o exterior" &&
            promptData.destino !== "Para alguma cidade Brasileira"
          ) {
            destination = promptData.destino;
          }
        }

        // Se não conseguiu extrair duração do plan_result, tentar prompt_data como fallback
        if (
          duration === 7 &&
          trip.prompt_data &&
          typeof trip.prompt_data === "object"
        ) {
          const promptData = trip.prompt_data as any;
          if (promptData.duration) {
            duration = parseInt(promptData.duration, 10) || duration;
          } else if (promptData.duracao) {
            duration = parseInt(promptData.duracao, 10) || duration;
          } else if (promptData.days) {
            duration = parseInt(promptData.days, 10) || duration;
          } else if (promptData.dias) {
            duration = parseInt(promptData.dias, 10) || duration;
          }
        }

        // Se não encontrou duração no prompt_data, tentar extrair do plan_result
        if (duration === 3) {
          duration = this.extractDurationFromPlan(trip.plan_result);
        }

        // Verificar se existe mala salva no localStorage
        const hasBag = localStorage.getItem(`tripBag_${trip.id}`) !== null;

        return {
          id: trip.id,
          destination,
          duration,
          planResult: trip.plan_result,
          hasBag,
        };
      });

      return {
        success: true,
        message: "Viagens encontradas com sucesso.",
        data: tripsForBag,
      };
    } catch (error) {
      console.error("Erro ao buscar viagens para mala:", error);
      const message =
        error instanceof Error ? error.message : "Erro de conexão.";
      return { success: false, message, data: null };
    }
  }

  // Função auxiliar para extrair destino do plan_result
  private extractDestinationFromPlan(planResult: string): string {
    try {
      const lines = planResult
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      // Procurar pelo título que geralmente está no formato "### Título: X Dias de... em [DESTINO]"
      for (const line of lines) {
        if (line.startsWith("### Título:") || line.startsWith("# Título:")) {
          const title = line.replace(/^#+\s*Título:\s*/i, "").trim();

          // Extrair destino de padrões como "X Dias de... em Miami" ou "X Dias de... em Londres"
          const patterns = [
            /em\s+([^,\n]+(?:,\s*[^,\n]+)?)/i, // "em Miami" ou "em Quebec, Canadá"
            /para\s+([^,\n]+(?:,\s*[^,\n]+)?)/i, // "para Londres"
            /de\s+([A-Z][^,\n]+(?:,\s*[^,\n]+)?)/i, // "de São Paulo"
          ];

          for (const pattern of patterns) {
            const match = title.match(pattern);
            if (match) {
              const destination = match[1].trim();
              // Verificar se não é uma palavra genérica
              if (
                !destination.toLowerCase().includes("negócios") &&
                !destination.toLowerCase().includes("aventura") &&
                !destination.toLowerCase().includes("família") &&
                !destination.toLowerCase().includes("cultura") &&
                !destination.toLowerCase().includes("resumo") &&
                !destination.toLowerCase().includes("geral") &&
                !destination.toLowerCase().includes("viagem") &&
                destination.length > 2
              ) {
                return destination;
              }
            }
          }

          // Se não conseguiu extrair com padrões, tentar pegar a última parte do título
          const words = title.split(" ");
          if (words.length >= 2) {
            const lastWords = words.slice(-2).join(" "); // Últimas 2 palavras
            if (lastWords.length > 2 && /^[A-Z]/.test(lastWords)) {
              return lastWords;
            }
          }
        }
      }

      // Fallback: procurar por títulos simples que podem ser destinos
      for (const line of lines) {
        if (line.startsWith("###") || line.startsWith("#")) {
          const clean = line
            .replace(/^#+\s*/, "")
            .replace(/\*+/g, "")
            .trim();
          if (
            clean.length > 2 &&
            clean.length < 30 &&
            !clean.toLowerCase().includes("título") &&
            !clean.toLowerCase().includes("dia") &&
            !clean.toLowerCase().includes("roteiro")
          ) {
            return clean;
          }
        }
      }

      return "Destino não identificado";
    } catch (error) {
      console.error("Erro ao extrair destino:", error);
      return "Destino não identificado";
    }
  }

  // Função auxiliar para extrair duração do plan_result
  private extractDurationFromPlan(planResult: string): number {
    try {
      // Procurar no título que tem formato "### Título: X Dias de..."
      const titleMatch = planResult.match(/###\s*Título:\s*(\d+)\s*Dias/i);
      if (titleMatch) {
        return parseInt(titleMatch[1], 10);
      }

      // Procurar por outros padrões de dias
      const dayPatterns = [
        /(\d+)\s*dias?\s*de/i,
        /(\d+)\s*dias?\s*em/i,
        /duração:?\s*(\d+)/i,
        /duration:?\s*(\d+)/i,
      ];

      for (const pattern of dayPatterns) {
        const match = planResult.match(pattern);
        if (match) {
          const duration = parseInt(match[1], 10);
          if (duration > 0 && duration <= 30) {
            // Validação básica
            return duration;
          }
        }
      }

      // Contar dias pela quantidade de "Dia X" no texto
      const dayMatches = planResult.match(/\*\*Dia\s+(\d+)/gi);
      if (dayMatches && dayMatches.length > 0) {
        const lastDay = Math.max(
          ...dayMatches.map((match) => {
            const num = match.match(/\d+/);
            return num ? parseInt(num[0], 10) : 1;
          })
        );
        if (lastDay > 0 && lastDay <= 30) {
          return lastDay;
        }
      }

      // Valor padrão
      return 7;
    } catch (error) {
      console.error("Erro ao extrair duração:", error);
      return 7;
    }
  }

  // Buscar mala específica de uma viagem
  async getTripBag(tripId: string): Promise<ApiResponse<TripBag>> {
    try {
      const response = await fetch(`${API_URL}/bags/trip/${tripId}`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se não encontrou (404), retornar que não existe
        if (response.status === 404 || data.error?.includes("não encontrada")) {
          return {
            success: false,
            message: "Mala não encontrada para esta viagem",
            data: null,
          };
        }
        return this.handleAuthError(response, data);
      }

      // Mapear resposta do backend para o formato esperado
      const bagData: TripBag = {
        id: data.id,
        tripId: data.trip_id,
        items: data.items || [],
        lastModified: data.updated_at,
        progress: {
          total: (data.items || []).length,
          checked: (data.items || []).filter((item: BagItem) => item.packed).length,
          progress:
            (data.items || []).length > 0
              ? ((data.items || []).filter((item: BagItem) => item.packed).length /
                  (data.items || []).length) *
                100
              : 0,
        },
      };

      return {
        success: true,
        message: "Mala carregada com sucesso.",
        data: bagData,
      };
    } catch (error) {
      console.error("Erro ao buscar mala da viagem:", error);
      const message =
        error instanceof Error ? error.message : "Erro de conexão.";
      return { success: false, message, data: null };
    }
  }

  // Criar nova mala para uma viagem
  async createTripBag(tripId: string): Promise<ApiResponse<TripBag>> {
    try {
      const response = await fetch(`${API_URL}/bags`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          tripId,
          items: [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return this.handleAuthError(response, data);
      }

      // Mapear resposta do backend para o formato esperado
      const bagData: TripBag = {
        id: data.id,
        tripId: data.trip_id,
        items: data.items || [],
        lastModified: data.updated_at,
        progress: {
          total: 0,
          checked: 0,
          progress: 0,
        },
      };

      return {
        success: true,
        message: "Mala criada com sucesso.",
        data: bagData,
      };
    } catch (error) {
      console.error("Erro ao criar mala da viagem:", error);
      const message =
        error instanceof Error ? error.message : "Erro de conexão.";
      return { success: false, message, data: null };
    }
  }

  // Adicionar item à mala
  async addItemToBag(
    tripId: string,
    item: Omit<BagItem, "id">
  ): Promise<ApiResponse<BagItem>> {
    try {
      // Primeiro, buscar a mala atual
      const bagResponse = await this.getTripBag(tripId);

      if (!bagResponse.success || !bagResponse.data) {
        return {
          success: false,
          message: "Mala não encontrada. Crie uma mala primeiro.",
          data: null,
        };
      }

      const newItem: BagItem = {
        ...item,
        id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      };

      // Atualizar items array
      const updatedItems = [...bagResponse.data.items, newItem];

      // Atualizar no backend
      const response = await fetch(`${API_URL}/bags/${bagResponse.data.id}`, {
        method: "PATCH",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          items: updatedItems,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return this.handleAuthError(response, data);
      }

      return {
        success: true,
        message: "Item adicionado com sucesso.",
        data: newItem,
      };
    } catch (error) {
      console.error("Erro ao adicionar item à mala:", error);
      const message =
        error instanceof Error ? error.message : "Erro de conexão.";
      return { success: false, message, data: null };
    }
  }

  // Atualizar item da mala
  async updateBagItem(
    tripId: string,
    itemId: string,
    updates: Partial<BagItem>
  ): Promise<ApiResponse<BagItem>> {
    try {
      // Primeiro, buscar a mala atual
      const bagResponse = await this.getTripBag(tripId);

      if (!bagResponse.success || !bagResponse.data) {
        return {
          success: false,
          message: "Mala não encontrada.",
          data: null,
        };
      }

      // Encontrar e atualizar o item
      const updatedItems = bagResponse.data.items.map((item) =>
        item.id === itemId ? { ...item, ...updates } : item
      );

      const updatedItem = updatedItems.find((item) => item.id === itemId);

      if (!updatedItem) {
        return {
          success: false,
          message: "Item não encontrado.",
          data: null,
        };
      }

      // Atualizar no backend
      const response = await fetch(`${API_URL}/bags/${bagResponse.data.id}`, {
        method: "PATCH",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          items: updatedItems,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return this.handleAuthError(response, data);
      }

      return {
        success: true,
        message: "Item atualizado com sucesso.",
        data: updatedItem,
      };
    } catch (error) {
      console.error("Erro ao atualizar item da mala:", error);
      const message =
        error instanceof Error ? error.message : "Erro de conexão.";
      return { success: false, message, data: null };
    }
  }

  // Remover item da mala
  async removeItemFromBag(
    tripId: string,
    itemId: string
  ): Promise<ApiResponse<null>> {
    try {
      // Primeiro, buscar a mala atual
      const bagResponse = await this.getTripBag(tripId);

      if (!bagResponse.success || !bagResponse.data) {
        return {
          success: false,
          message: "Mala não encontrada.",
          data: null,
        };
      }

      // Filtrar o item removido
      const updatedItems = bagResponse.data.items.filter(
        (item) => item.id !== itemId
      );

      if (updatedItems.length === bagResponse.data.items.length) {
        return {
          success: false,
          message: "Item não encontrado.",
          data: null,
        };
      }

      // Atualizar no backend
      const response = await fetch(`${API_URL}/bags/${bagResponse.data.id}`, {
        method: "PATCH",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          items: updatedItems,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return this.handleAuthError(response, data);
      }

      return {
        success: true,
        message: "Item removido com sucesso.",
        data: null,
      };
    } catch (error) {
      console.error("Erro ao remover item da mala:", error);
      const message =
        error instanceof Error ? error.message : "Erro de conexão.";
      return { success: false, message, data: null };
    }
  }

  // Marcar/desmarcar item como checado
  async toggleBagItem(
    tripId: string,
    itemId: string
  ): Promise<ApiResponse<BagItem>> {
    try {
      // Primeiro, buscar a mala atual
      const bagResponse = await this.getTripBag(tripId);

      if (!bagResponse.success || !bagResponse.data) {
        return {
          success: false,
          message: "Mala não encontrada.",
          data: null,
        };
      }

      const item = bagResponse.data.items.find((item) => item.id === itemId);

      if (!item) {
        return {
          success: false,
          message: "Item não encontrado.",
          data: null,
        };
      }

      // Toggle packed status
      const updatedItems = bagResponse.data.items.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      );

      const updatedItem = updatedItems.find((item) => item.id === itemId)!;

      // Atualizar no backend
      const response = await fetch(`${API_URL}/bags/${bagResponse.data.id}`, {
        method: "PATCH",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          items: updatedItems,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return this.handleAuthError(response, data);
      }

      return {
        success: true,
        message: "Item atualizado com sucesso.",
        data: updatedItem,
      };
    } catch (error) {
      console.error("Erro ao marcar/desmarcar item:", error);
      const message =
        error instanceof Error ? error.message : "Erro de conexão.";
      return { success: false, message, data: null };
    }
  }

  // Sincronizar mala completa
  async syncTripBag(
    tripId: string,
    items: BagItem[]
  ): Promise<ApiResponse<TripBag>> {
    try {
      // Primeiro, buscar a mala atual para obter o ID
      const bagResponse = await this.getTripBag(tripId);

      if (!bagResponse.success || !bagResponse.data) {
        return {
          success: false,
          message: "Mala não encontrada.",
          data: null,
        };
      }

      // Atualizar no backend
      const response = await fetch(`${API_URL}/bags/${bagResponse.data.id}`, {
        method: "PATCH",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          items,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return this.handleAuthError(response, data);
      }

      // Mapear resposta do backend
      const bagData: TripBag = {
        id: data.id,
        tripId: data.trip_id,
        items: data.items || [],
        lastModified: data.updated_at,
        progress: {
          total: (data.items || []).length,
          checked: (data.items || []).filter((item: BagItem) => item.packed).length,
          progress:
            (data.items || []).length > 0
              ? ((data.items || []).filter((item: BagItem) => item.packed).length /
                  (data.items || []).length) *
                100
              : 0,
        },
      };

      return {
        success: true,
        message: "Mala sincronizada com sucesso.",
        data: bagData,
      };
    } catch (error) {
      console.error("Erro ao sincronizar mala:", error);
      const message =
        error instanceof Error ? error.message : "Erro de conexão.";
      return { success: false, message, data: null };
    }
  }

  // Salvar mala completa no backend
  async saveTripBag(tripId: string): Promise<ApiResponse<TripBag>> {
    try {
      // Buscar a mala atual do backend
      const bagResponse = await this.getTripBag(tripId);

      if (!bagResponse.success || !bagResponse.data) {
        return {
          success: false,
          message: "Mala não encontrada para salvar.",
          data: null,
        };
      }

      // A mala já está salva no backend através dos métodos PATCH
      // Este método apenas retorna os dados atuais
      return {
        success: true,
        message: "Mala salva com sucesso no servidor!",
        data: bagResponse.data,
      };
    } catch (error) {
      console.error("Erro ao salvar mala:", error);
      const message =
        error instanceof Error ? error.message : "Erro de conexão.";
      return { success: false, message, data: null };
    }
  }

  // Verificar se a mala tem alterações não salvas
  // Como agora tudo é salvo diretamente no backend, sempre retornamos false
  hasPendingChanges(tripId: string): boolean {
    return false;
  }
}

export const bagsService = new BagsService();
