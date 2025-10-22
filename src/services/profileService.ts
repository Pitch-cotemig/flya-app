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
  // Profile Management
  async updateProfile(
    profileData: ProfileUpdateData
  ): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: createAuthHeaders(),
        body: JSON.stringify(profileData),
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
      const response = await fetch(`${API_URL}/profile/password`, {
        method: "PUT",
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
        method: "PUT",
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
      const response = await fetch(`${API_URL}/profile`, {
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
        message: `Erro ao buscar configurações de notificação: ${message}`,
        data: null,
      };
    }
  }

  async updateNotificationSettings(
    settings: NotificationSettings
  ): Promise<ApiResponse<NotificationSettings>> {
    try {
      const response = await fetch(`${API_URL}/profile/notifications`, {
        method: "PUT",
        headers: createAuthHeaders(),
        body: JSON.stringify(settings),
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

      return {
        success: true,
        message: "Configurações de notificação salvas com sucesso",
        data: data.settings,
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
