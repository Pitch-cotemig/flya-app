const API_URL = "http://localhost:3000";

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface RecentTrip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  isFavorite: boolean;
  createdAt: string;
}

export interface MonthlyTrip {
  month: string;
  count: number;
  year: number;
}

export interface Destination {
  name: string;
  count: number;
}

export interface DashboardStats {
  totalTrips: number;
  favoriteTrips: number;
  totalDestinations: number;
  averageTripDuration: number;
  totalBudgetSpent: number;
  recentTrips: RecentTrip[];
  tripsByMonth: MonthlyTrip[];
  mostVisitedDestinations: Destination[];
}

class DashboardService {
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

  async getStats(): Promise<ApiResponse<DashboardStats>> {
    try {
      const response = await fetch(`${API_URL}/dashboard/stats`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        return this.handleAuthError(response, data);
      }

      return {
        success: true,
        message: "Estatísticas carregadas com sucesso.",
        data,
      };
    } catch (error) {
      console.error("Erro ao buscar estatísticas do dashboard:", error);
      const message =
        error instanceof Error ? error.message : "Erro de conexão.";
      return { success: false, message, data: null };
    }
  }
}

export const dashboardService = new DashboardService();
