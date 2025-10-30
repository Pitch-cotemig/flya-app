// Profile service for managing user profile, security and notifications
import { User } from "./authService";

const API_URL = "http://localhost:3000";

// Profile interfaces
export interface ProfileUpdateData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  avatar?: string;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
}

// Backend notification format
export interface EmailNotificationSettings {
  tripUpdates?: {
    enabled: boolean;
    frequency?: string;
  };
  bookingConfirmations?: {
    enabled: boolean;
  };
  destinationTips?: {
    enabled: boolean;
    frequency?: string;
  };
  promotionalOffers?: {
    enabled: boolean;
    frequency?: string;
  };
}

export interface PushNotificationSettings {
  realtimeUpdates?: {
    enabled: boolean;
  };
  checkinReminders?: {
    enabled: boolean;
  };
  weatherAlerts?: {
    enabled: boolean;
  };
}

export interface BackendNotificationSettings {
  email?: EmailNotificationSettings;
  push?: PushNotificationSettings;
}

// Frontend notification format (for display)
export interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  frequency?: string;
  hasFrequency?: boolean;
  type: "email" | "push";
}

export interface NotificationSettings {
  emailNotifications: NotificationSetting[];
  pushNotifications: NotificationSetting[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
}

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

// Helper function to create headers with auth token
const createAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

class ProfileService {
  // Helper: Convert backend notification format to frontend format
  private backendToFrontend(backendSettings: any): NotificationSettings {
    const emailNotifications: NotificationSetting[] = [
      {
        id: "trip-updates",
        title: "Atualizações de Viagem",
        description: "Receba notificações sobre mudanças em seus planos de viagem",
        enabled: backendSettings.email?.tripUpdates?.enabled || false,
        frequency: backendSettings.email?.tripUpdates?.frequency || "instantaneo",
        hasFrequency: true,
        type: "email",
      },
      {
        id: "booking-confirmations",
        title: "Confirmações de Reserva",
        description: "Confirmações de hotéis, voos e outros serviços",
        enabled: backendSettings.email?.bookingConfirmations?.enabled || false,
        type: "email",
      },
      {
        id: "destination-tips",
        title: "Dicas de Destino",
        description: "Sugestões e informações sobre seus destinos",
        enabled: backendSettings.email?.destinationTips?.enabled || false,
        frequency: backendSettings.email?.destinationTips?.frequency || "semanal",
        hasFrequency: true,
        type: "email",
      },
      {
        id: "promotional",
        title: "Ofertas Promocionais",
        description: "Descontos e ofertas especiais para viagens",
        enabled: backendSettings.email?.promotionalOffers?.enabled || false,
        frequency: backendSettings.email?.promotionalOffers?.frequency || "semanal",
        hasFrequency: true,
        type: "email",
      },
    ];

    const pushNotifications: NotificationSetting[] = [
      {
        id: "real-time-updates",
        title: "Atualizações em Tempo Real",
        description: "Notificações instantâneas sobre sua viagem atual",
        enabled: backendSettings.push?.realtimeUpdates?.enabled || false,
        type: "push",
      },
      {
        id: "check-in-reminders",
        title: "Lembretes de Check-in",
        description: "Lembrete 24h antes do check-in do hotel ou voo",
        enabled: backendSettings.push?.checkinReminders?.enabled || false,
        type: "push",
      },
      {
        id: "weather-alerts",
        title: "Alertas de Clima",
        description: "Mudanças importantes no clima do seu destino",
        enabled: backendSettings.push?.weatherAlerts?.enabled || false,
        type: "push",
      },
    ];

    return { emailNotifications, pushNotifications };
  }

  // Helper: Convert frontend notification format to backend format
  private frontendToBackend(frontendSettings: NotificationSettings): any {
    const tripUpdates = frontendSettings.emailNotifications.find(n => n.id === "trip-updates");
    const bookingConfirmations = frontendSettings.emailNotifications.find(n => n.id === "booking-confirmations");
    const destinationTips = frontendSettings.emailNotifications.find(n => n.id === "destination-tips");
    const promotional = frontendSettings.emailNotifications.find(n => n.id === "promotional");

    const realtimeUpdates = frontendSettings.pushNotifications.find(n => n.id === "real-time-updates");
    const checkinReminders = frontendSettings.pushNotifications.find(n => n.id === "check-in-reminders");
    const weatherAlerts = frontendSettings.pushNotifications.find(n => n.id === "weather-alerts");

    return {
      email: {
        atualizacoesViagem: {
          enabled: tripUpdates?.enabled || false,
          frequency: tripUpdates?.frequency || "instantaneo",
        },
        confirmacoesReserva: {
          enabled: bookingConfirmations?.enabled || false,
        },
        dicasDestino: {
          enabled: destinationTips?.enabled || false,
          frequency: destinationTips?.frequency || "semanal",
        },
        ofertasPromocionais: {
          enabled: promotional?.enabled || false,
          frequency: promotional?.frequency || "semanal",
        },
      },
      push: {
        atualizacoesTempoReal: {
          enabled: realtimeUpdates?.enabled || false,
        },
        lembretesCheckIn: {
          enabled: checkinReminders?.enabled || false,
        },
        alertasClima: {
          enabled: weatherAlerts?.enabled || false,
        },
      },
    };
  }

  // Profile Management
  async getProfile(): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: createAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Erro ao buscar perfil",
          data: null,
        };
      }

      return {
        success: true,
        message: "Perfil carregado com sucesso",
        data: data.user,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        success: false,
        message: `Erro ao buscar perfil: ${message}`,
        data: null,
      };
    }
  }

  async updateProfile(
    profileData: ProfileUpdateData,
    avatarFile?: File
  ): Promise<ApiResponse<User>> {
    try {
      let headers: HeadersInit;
      let body: any;

      // If there's an avatar file, use FormData
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        formData.append("username", profileData.username);
        formData.append("firstName", profileData.firstName);
        formData.append("lastName", profileData.lastName);
        formData.append("email", profileData.email);
        if (profileData.birthDate) {
          formData.append("birthDate", profileData.birthDate);
        }

        const token = getAuthToken();
        headers = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        body = formData;
      } else {
        headers = createAuthHeaders();
        body = JSON.stringify(profileData);
      }

      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers,
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Erro ao atualizar perfil",
          data: null,
        };
      }

      return {
        success: true,
        message: "Perfil atualizado com sucesso",
        data: data.user,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        success: false,
        message: `Erro ao atualizar perfil: ${message}`,
        data: null,
      };
    }
  }

  async uploadAvatar(file: File): Promise<ApiResponse<{ avatarUrl: string }>> {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const token = getAuthToken();
      const headers: HeadersInit = {};

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/profile/avatar`, {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Erro ao fazer upload da foto",
          data: null,
        };
      }

      return {
        success: true,
        message: "Foto atualizada com sucesso",
        data: { avatarUrl: data.avatarUrl },
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        success: false,
        message: `Erro ao fazer upload da foto: ${message}`,
        data: null,
      };
    }
  }

  async removeAvatar(): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(`${API_URL}/profile/avatar`, {
        method: "DELETE",
        headers: createAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Erro ao remover foto",
          data: null,
        };
      }

      return {
        success: true,
        message: "Foto removida com sucesso",
        data: null,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        success: false,
        message: `Erro ao remover foto: ${message}`,
        data: null,
      };
    }
  }

  // Security Management
  async changePassword(
    passwordData: PasswordChangeData
  ): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(`${API_URL}/profile/security/password`, {
        method: "PATCH",
        headers: createAuthHeaders(),
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Erro ao alterar senha",
          data: null,
        };
      }

      return {
        success: true,
        message: "Senha alterada com sucesso",
        data: null,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        success: false,
        message: `Erro ao alterar senha: ${message}`,
        data: null,
      };
    }
  }

  async toggleTwoFactor(
    enabled: boolean
  ): Promise<ApiResponse<SecuritySettings>> {
    try {
      const response = await fetch(`${API_URL}/profile/security/2fa`, {
        method: "PATCH",
        headers: createAuthHeaders(),
        body: JSON.stringify({ enabled }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Erro ao configurar 2FA",
          data: null,
        };
      }

      return {
        success: true,
        message: `Autenticação de dois fatores ${
          enabled ? "ativada" : "desativada"
        } com sucesso`,
        data: data.settings,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        success: false,
        message: `Erro ao configurar 2FA: ${message}`,
        data: null,
      };
    }
  }

  async getSecuritySettings(): Promise<ApiResponse<SecuritySettings>> {
    try {
      const response = await fetch(`${API_URL}/profile/security`, {
        method: "GET",
        headers: createAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Erro ao buscar configurações de segurança",
          data: null,
        };
      }

      return {
        success: true,
        message: "Configurações carregadas com sucesso",
        data: data.settings,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        success: false,
        message: `Erro ao buscar configurações de segurança: ${message}`,
        data: null,
      };
    }
  }

  async terminateAllSessions(): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(`${API_URL}/profile/security/sessions`, {
        method: "DELETE",
        headers: createAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Erro ao encerrar sessões",
          data: null,
        };
      }

      return {
        success: true,
        message: "Todas as outras sessões foram encerradas",
        data: null,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        success: false,
        message: `Erro ao encerrar sessões: ${message}`,
        data: null,
      };
    }
  }

  async deleteAccount(): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(`${API_URL}/profile/security/account`, {
        method: "DELETE",
        headers: createAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Erro ao excluir conta",
          data: null,
        };
      }

      return {
        success: true,
        message: "Conta excluída permanentemente",
        data: null,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        success: false,
        message: `Erro ao excluir conta: ${message}`,
        data: null,
      };
    }
  }

  // Notifications Management
  async getNotificationSettings(): Promise<ApiResponse<NotificationSettings>> {
    try {
      const response = await fetch(`${API_URL}/profile/notifications`, {
        method: "GET",
        headers: createAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message:
            data.message || "Erro ao buscar configurações de notificação",
          data: null,
        };
      }

      // Convert backend format to frontend format
      const frontendSettings = this.backendToFrontend(data.settings);

      return {
        success: true,
        message: "Configurações carregadas com sucesso",
        data: frontendSettings,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        success: false,
        message: `Erro ao buscar configurações de notificação: ${message}`,
        data: null,
      };
    }
  }

  async updateNotificationSettings(
    settings: NotificationSettings
  ): Promise<ApiResponse<NotificationSettings>> {
    try {
      // Convert frontend format to backend format
      const backendSettings = this.frontendToBackend(settings);

      const response = await fetch(`${API_URL}/profile/notifications`, {
        method: "PUT",
        headers: createAuthHeaders(),
        body: JSON.stringify(backendSettings),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message:
            data.message || "Erro ao salvar configurações de notificação",
          data: null,
        };
      }

      // Convert backend response to frontend format
      const frontendSettings = this.backendToFrontend(data.settings || backendSettings);

      return {
        success: true,
        message: "Configurações de notificação salvas com sucesso",
        data: frontendSettings,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      return {
        success: false,
        message: `Erro ao salvar configurações de notificação: ${message}`,
        data: null,
      };
    }
  }
}

// Export singleton instance
export const profileService = new ProfileService();
