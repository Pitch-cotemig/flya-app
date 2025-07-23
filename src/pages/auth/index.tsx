import { useState } from 'react';
import { AuthCard } from '../../components';
import { authService, User } from '../../services/authService';
import { authStyles } from './styles';

interface FormData {
  email: string;
  password: string;
}

interface AuthPageProps {
  onLoginSuccess: (user: User, token: string) => void;
}

function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoginSubmit = async (formData: FormData): Promise<void> => {
    setLoading(true);
    setError(null);
    const response = await authService.login(formData);
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
    const response = await authService.register(formData);
    setLoading(false);

    if (response.success && response.data) {
      // Automatically log in the user after successful registration
      onLoginSuccess(response.data.user, response.data.token);
    } else {
      setError(response.message);
    }
  };

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
