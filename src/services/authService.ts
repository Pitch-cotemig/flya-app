// Authentication service interfaces
// TODO: Implementar chamadas reais de API para o backend

// Type definitions
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  birthDate: string;
  avatar?: string;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface LoginSuccessData {
  user: User;
  token: string;
  requiresTwoFactor?: boolean;
}

export interface RegisterSuccessData {
  user: User;
  token: string;
}

export interface ValidateSuccessData {
  user: User;
}

export interface TwoFactorStatusData {
  two_factor_enabled: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout = 10000,
    retries = 1
  ): Promise<Response> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        clearTimeout(id);
        return response;
      } catch (error) {
        if (attempt === retries) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    throw new Error("Falha após múltiplas tentativas");
  }

  async login(
    credentials: LoginCredentials
  ): Promise<AuthResponse<LoginSuccessData>> {
    try {
      const response = await this.fetchWithTimeout(
        `${API_URL}/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        },
        10000,
        1
      );

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message, data: null };
      }

      return { success: true, message: "Login successful", data };
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          return {
            success: false,
            message: "A conexão demorou muito. Tente novamente.",
            data: null,
          };
        }
        if (error.message.includes("fetch")) {
          return {
            success: false,
            message:
              "Erro de conexão. Verifique sua internet e tente novamente.",
            data: null,
          };
        }
        return { success: false, message: error.message, data: null };
      }
      return {
        success: false,
        message: "Erro desconhecido. Tente novamente.",
        data: null,
      };
    }
  }

  async register(
    credentials: RegisterCredentials
  ): Promise<AuthResponse<RegisterSuccessData>> {
    try {
      const response = await this.fetchWithTimeout(
        `${API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        },
        10000,
        1
      );

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message, data: null };
      }

      return { success: true, message: "Registration successful", data };
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          return {
            success: false,
            message: "A conexão demorou muito. Tente novamente.",
            data: null,
          };
        }
        if (error.message.includes("fetch")) {
          return {
            success: false,
            message:
              "Erro de conexão. Verifique sua internet e tente novamente.",
            data: null,
          };
        }
        return { success: false, message: error.message, data: null };
      }
      return {
        success: false,
        message: "Erro desconhecido. Tente novamente.",
        data: null,
      };
    }
  }

  async validateToken(
    token: string
  ): Promise<AuthResponse<ValidateSuccessData>> {
    try {
      const response = await this.fetchWithTimeout(
        `${API_URL}/auth/validate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
        10000,
        1
      );

      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message, data: null };
      }
      return { success: true, message: "Token is valid", data };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return {
          success: false,
          message: "Tempo de validação esgotado",
          data: null,
        };
      }
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      return { success: false, message, data: null };
    }
  }

  async verify2FA(
    email: string,
    code: string
  ): Promise<AuthResponse<LoginSuccessData>> {
    try {
      const response = await this.fetchWithTimeout(
        `${API_URL}/auth/2fa/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code }),
        },
        10000,
        1
      );

      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message, data: null };
      }
      return { success: true, message: "2FA verified", data };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return {
          success: false,
          message: "Verificação 2FA demorou muito",
          data: null,
        };
      }
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      return { success: false, message, data: null };
    }
  }

  async logout(): Promise<AuthResponse<null>> {
    // TODO: Implementar chamada real de API
    throw new Error("Backend não implementado");
  }

  async get2FAStatus(): Promise<AuthResponse<{ two_factor_enabled: boolean }>> {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return { success: false, message: "Token não encontrado", data: null };
      }

      const response = await this.fetchWithTimeout(
        `${API_URL}/auth/2fa/status`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        10000,
        1
      );

      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message, data: null };
      }
      return { success: true, message: "Status obtido", data };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return {
          success: false,
          message: "Falha ao obter status 2FA",
          data: null,
        };
      }
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      return { success: false, message, data: null };
    }
  }

  async toggle2FA(): Promise<AuthResponse<{ two_factor_enabled: boolean }>> {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return { success: false, message: "Token não encontrado", data: null };
      }

      const response = await this.fetchWithTimeout(
        `${API_URL}/auth/2fa/toggle`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
        10000,
        1
      );

      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message, data: null };
      }
      return { success: true, message: "2FA atualizado", data };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return {
          success: false,
          message: "Falha ao atualizar 2FA",
          data: null,
        };
      }
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      return { success: false, message, data: null };
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
