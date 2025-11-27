import { useState } from "react";
import { AuthCard, TwoFactorForm } from "../../components";
import { authService, User } from "../../services/authService";

interface FormData {
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  confirmPassword?: string;
}

interface AuthPageProps {
  onLoginSuccess: (user: User, token: string) => void;
}

function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleLoginSubmit = async (formData: FormData): Promise<void> => {
    setLoading(true);
    setError(null);
    const response = await authService.login(formData);
    setLoading(false);

    if (response.success && response.data) {
      if (response.data.requiresTwoFactor) {
        setUserEmail(formData.email);
        setShowTwoFactor(true);
      } else {
        onLoginSuccess(response.data.user, response.data.token);
      }
    } else {
      let errorMessage = response.message;

      if (
        errorMessage.includes("Failed to fetch") ||
        errorMessage.includes("conexão")
      ) {
        errorMessage =
          "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.";
      } else if (
        errorMessage.includes("timeout") ||
        errorMessage.includes("demorou")
      ) {
        errorMessage =
          "O servidor demorou para responder. Tente novamente em alguns instantes.";
      } else if (errorMessage.includes("Invalid login credentials")) {
        errorMessage = "E-mail ou senha incorretos. Tente novamente.";
      }

      setError(errorMessage);
    }
  };

  const handle2FA = async (code: string): Promise<void> => {
    setLoading(true);
    setError(null);
    const response = await authService.verify2FA(userEmail, code);
    setLoading(false);

    if (response.success && response.data) {
      onLoginSuccess(response.data.user, response.data.token);
    } else {
      setError(response.message);
    }
  };

  const handleRegisterSubmit = async (formData: FormData): Promise<void> => {
    setLoading(true);
    setError(null);

    if (
      !formData.username ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.birthDate
    ) {
      setError("Todos os campos são obrigatórios.");
      setLoading(false);
      return;
    }

    const response = await authService.register({
      email: formData.email,
      password: formData.password,
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: formData.birthDate,
      confirmPassword: formData.confirmPassword || formData.password,
    });
    setLoading(false);

    if (response.success && response.data) {
      // Automatically log in the user after successful registration
      onLoginSuccess(response.data.user, response.data.token);
    } else {
      setError(response.message);
    }
  };

  if (showTwoFactor) {
    return (
      <TwoFactorForm
        email={userEmail}
        onSubmit={handle2FA}
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <AuthCard
      onLogin={handleLoginSubmit}
      onRegister={handleRegisterSubmit}
      loading={loading}
      error={error}
    />
  );
}

export default AuthPage;
