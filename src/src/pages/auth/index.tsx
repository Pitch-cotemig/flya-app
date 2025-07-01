import { useState } from "react";
import { AuthCard } from "../../components";
import { authService, User } from "../../services/auth";
import { authStyles } from "./styles";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData extends LoginData {
  nome: string;
}

interface AuthPageProps {
  onLogin: (user: User) => void;
}

function AuthPage({ onLogin }: AuthPageProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoginSubmit = async (formData: LoginData): Promise<void> => {
    setLoading(true);
    try {
      const result = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      if (result.success && result.data) {
        onLogin(result.data.user);
        alert(`Bem-vindo, ${result.data.user.nome}!`);
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

  const handleRegisterSubmit = async (formData: SignupData): Promise<void> => {
    setLoading(true);
    try {
      const result = await authService.register({
        nome: formData.nome,
        email: formData.email,
        password: formData.password,
      });

      if (result.success && result.data) {
        onLogin(result.data.user);
        alert(`Conta criada com sucesso! Bem-vindo, ${result.data.user.nome}!`);
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

  if (loading) {
    return <div style={authStyles.loadingContainer}>Carregando...</div>;
  }

  return (
    <AuthCard onLogin={handleLoginSubmit} onRegister={handleRegisterSubmit} />
  );
}

export default AuthPage;
