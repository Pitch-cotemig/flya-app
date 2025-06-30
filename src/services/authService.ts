// Mock authentication service
// This simulates API calls for login and register operations

// Type definitions
export interface User {
  id: number;
  email: string;
  name: string;
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

// Simulate API delay
const simulateApiDelay = (ms: number = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Mock user database (in a real app, this would be handled by a backend)
const mockUsers: UserWithPassword[] = [
  {
    id: 1,
    email: "user@flya.com",
    password: "123456",
    name: "Test User",
  },
  {
    id: 2,
    email: "admin@flya.com",
    password: "admin123",
    name: "Admin User",
  },
];

// Auth service class
class AuthService {
  // Login function
  async login(
    credentials: LoginCredentials
  ): Promise<AuthResponse<LoginSuccessData>> {
    await simulateApiDelay(800);

    const { email, password } = credentials;

    // Find user by email
    const user = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return {
        success: false,
        message: "Usuário não encontrado",
        data: null,
      };
    }

    if (user.password !== password) {
      return {
        success: false,
        message: "Senha incorreta",
        data: null,
      };
    }

    // Success - return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      message: "Login realizado com sucesso",
      data: {
        user: userWithoutPassword,
        token: `mock-jwt-token-${user.id}-${Date.now()}`,
      },
    };
  }

  // Register function
  async register(
    credentials: RegisterCredentials
  ): Promise<AuthResponse<RegisterSuccessData>> {
    await simulateApiDelay(1000);

    const { email, password } = credentials;

    // Check if user already exists
    const existingUser = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return {
        success: false,
        message: "E-mail já está em uso",
        data: null,
      };
    }

    // Validate password (basic validation)
    if (password.length < 6) {
      return {
        success: false,
        message: "A senha deve ter pelo menos 6 caracteres",
        data: null,
      };
    }

    // Create new user
    const newUser: UserWithPassword = {
      id: mockUsers.length + 1,
      email: email.toLowerCase(),
      password: password,
      name: email.split("@")[0], // Use email prefix as name
    };

    // Add to mock database
    mockUsers.push(newUser);

    // Return success (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    return {
      success: true,
      message: "Usuário criado com sucesso",
      data: {
        user: userWithoutPassword,
        token: `mock-jwt-token-${newUser.id}-${Date.now()}`,
      },
    };
  }

  // Validate function (checks if user is authenticated)
  async validate(token: string): Promise<AuthResponse<ValidateSuccessData>> {
    await simulateApiDelay(300);

    if (!token || !token.startsWith("mock-jwt-token-")) {
      return {
        success: false,
        message: "Token inválido",
        data: null,
      };
    }

    // Extract user ID from token
    const tokenParts = token.split("-");
    const userId = parseInt(tokenParts[3]);

    if (isNaN(userId)) {
      return {
        success: false,
        message: "Token malformado",
        data: null,
      };
    }

    const user = mockUsers.find((u) => u.id === userId);

    if (!user) {
      return {
        success: false,
        message: "Usuário não encontrado",
        data: null,
      };
    }

    // Return validated user
    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      message: "Usuário validado",
      data: {
        user: userWithoutPassword,
      },
    };
  }

  // Logout function (for completeness)
  async logout(): Promise<AuthResponse<null>> {
    await simulateApiDelay(200);

    return {
      success: true,
      message: "Logout realizado com sucesso",
      data: null,
    };
  }
}

// Export singleton instance
export const authService = new AuthService();

// Example usage with TypeScript:
/*
// Login
const loginResult: AuthResponse<LoginSuccessData> = await authService.login({
  email: 'user@flya.com',
  password: '123456'
});

// Register
const registerResult: AuthResponse<RegisterSuccessData> = await authService.register({
  email: 'newuser@flya.com',
  password: 'newpassword123'
});

// Validate
const validateResult: AuthResponse<ValidateSuccessData> = await authService.validate('mock-jwt-token-1-1640995200000');
*/
