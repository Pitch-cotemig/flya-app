import { useState } from "react";
import { AuthCard } from "../../components";
import { authService, User } from "../../services/authService";
import { authStyles } from "./styles";

interface FormData {
  email: string;
  password: string;
}

interface AuthPageProps {
  onLogin: (user: User) => void;
}

function AuthPage({ onLogin }: AuthPageProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoginSubmit = async (formData: FormData): Promise<void> => {
    setLoading(true);
    try {
      const result = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      if (result.success && result.data) {
        onLogin(result.data.user);
        alert(`Bem-vindo, ${result.data.user.name}!`);
        // Here you could store the token in localStorage
        // localStorage.setItem('token', result.data.token);
      } else {
        alert(`Erro no login: ${result.message}`);
      }
    } catch (error) {
      alert("Erro interno do servidor");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (formData: FormData): Promise<void> => {
    setLoading(true);
    try {
      const result = await authService.register({
        email: formData.email,
        password: formData.password,
      });

      if (result.success && result.data) {
        onLogin(result.data.user);
        alert(`Conta criada com sucesso! Bem-vindo, ${result.data.user.name}!`);
        // Here you could store the token in localStorage
        // localStorage.setItem('token', result.data.token);
      } else {
        alert(`Erro no cadastro: ${result.message}`);
      }
    } catch (error) {
      alert("Erro interno do servidor");
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return <div style={authStyles.loadingContainer}>Carregando...</div>;
  }

  // Show AuthCard with login/register forms
  return (
    <AuthCard onLogin={handleLoginSubmit} onRegister={handleRegisterSubmit} />
  );
}

export default AuthPage;
