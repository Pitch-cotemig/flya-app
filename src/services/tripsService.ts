const API_URL = "http://localhost:3000";

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
}

interface Trip {
  id: string;
  plan_result: string;
  is_favorite?: boolean;
  prompt_data?: object;
  ai_prompt?: string;
  created_at?: string;
}

class TripsService {
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

  async findAll(favorite?: boolean): Promise<ApiResponse<Trip[]>> {
    try {
      const url =
        favorite !== undefined
          ? `${API_URL}/trips?favorite=${favorite}`
          : `${API_URL}/trips`;

      const response = await fetch(url, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        return this.handleAuthError(response, data);
      }

      return { success: true, message: "Viagens encontradas.", data };
    } catch (error) {
      console.error("Erro ao buscar viagens:", error);
      const message =
        error instanceof Error ? error.message : "Erro de conexão.";
      return { success: false, message, data: null };
    }
  }

  async toggleFavorite(id: string): Promise<ApiResponse<Trip>> {
    try {
      const response = await fetch(`${API_URL}/trips/${id}/favorite`, {
        method: "PATCH",
        headers: this.getAuthHeaders(),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message, data: null };
      }
      return {
        success: true,
        message: "Favorito atualizado com sucesso.",
        data,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido.";
      return { success: false, message, data: null };
    }
  }

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(`${API_URL}/trips/${id}`, {
        method: "DELETE",
        headers: this.getAuthHeaders(),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message, data: null };
      }
      return {
        success: true,
        message: "Viagem deletada com sucesso.",
        data: null,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido.";
      return { success: false, message, data: null };
    }
  }

  async create(tripData: {
    prompt_data: object;
    ai_prompt: string;
    plan_result: string;
  }): Promise<ApiResponse<Trip>> {
    try {
      const response = await fetch(`${API_URL}/trips`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(tripData),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message, data: null };
      }
      return { success: true, message: "Viagem salva com sucesso.", data };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido.";
      return { success: false, message, data: null };
    }
  }
}

export const tripsService = new TripsService();
