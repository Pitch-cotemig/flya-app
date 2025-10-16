// Authentication service interfaces
// TODO: Implementar chamadas reais de API para o backend

// Type definitions
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

const API_URL = 'http://localhost:3000';

// Auth service class
class AuthService {
  async login(
    credentials: LoginCredentials,
  ): Promise<AuthResponse<LoginSuccessData>> {
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message, data: null };
      }

      return { success: true, message: 'Login successful', data };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      return {
        success: false,
        message,
        data: null,
      };
    }
  }

  async register(
    credentials: RegisterCredentials,
  ): Promise<AuthResponse<RegisterSuccessData>> {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message, data: null };
      }

      return { success: true, message: 'Registration successful', data };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      return {
        success: false,
        message,
        data: null,
      };
    }
  }

  async validateToken(token: string): Promise<AuthResponse<ValidateSuccessData>> {
    try {
      const response = await fetch(`${API_URL}/auth/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message, data: null };
      }
      return { success: true, message: 'Token is valid', data };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      return { success: false, message, data: null };
    }
  }

  async verify2FA(email: string, code: string): Promise<AuthResponse<LoginSuccessData>> {
    try {
      const response = await fetch(`${API_URL}/auth/2fa/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message, data: null };
      }
      return { success: true, message: '2FA verified', data };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      return { success: false, message, data: null };
    }
  }

  async logout(): Promise<AuthResponse<null>> {
    // TODO: Implementar chamada real de API
    throw new Error('Backend não implementado');
  }
}

// Export singleton instance
export const authService = new AuthService();
