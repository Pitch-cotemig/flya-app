import { useState } from "react";
import { AuthCard } from "../../components";
import { User } from "../../services/authService";
import { authStyles } from "./styles";

interface FormData {
  email: string;
  password: string;
}

interface AuthPageProps {
  onLogin: (user: User) => void;
}

function AuthPage({ }: AuthPageProps) {
  const [loading] = useState<boolean>(false);

  const handleLoginSubmit = async (_formData: FormData): Promise<void> => {
    // TODO: Implementar backend primeiro
    alert('Sistema de autenticação em desenvolvimento. Backend não implementado.');
  };

  const handleRegisterSubmit = async (_formData: FormData): Promise<void> => {
    // TODO: Implementar backend primeiro
    alert('Sistema de cadastro em desenvolvimento. Backend não implementado.');
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
