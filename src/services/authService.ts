// Authentication service interfaces
// TODO: Implementar chamadas reais de API para o backend

// Type definitions
export interface User {
  id: number;
  email: string;
  name: string;
  username?: string;
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
  email: string;
  password: string;
}

export interface AuthResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface LoginSuccessData {
  user: User;
  token: string;
}

export interface RegisterSuccessData {
  user: User;
  token: string;
}

export interface ValidateSuccessData {
  user: User;
}

// Auth service class - TODO: Implementar métodos reais
class AuthService {
  async login(
    _credentials: LoginCredentials
  ): Promise<AuthResponse<LoginSuccessData>> {
    // TODO: Implementar chamada real de API
    throw new Error('Backend não implementado');
  }

  async register(
    _credentials: RegisterCredentials
  ): Promise<AuthResponse<RegisterSuccessData>> {
    // TODO: Implementar chamada real de API
    throw new Error('Backend não implementado');
  }

  async validate(_token: string): Promise<AuthResponse<ValidateSuccessData>> {
    // TODO: Implementar chamada real de API
    throw new Error('Backend não implementado');
  }

  async logout(): Promise<AuthResponse<null>> {
    // TODO: Implementar chamada real de API
    throw new Error('Backend não implementado');
  }
}

// Export singleton instance
export const authService = new AuthService();
