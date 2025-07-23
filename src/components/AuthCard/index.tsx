import { useState } from "react";
import { RegisterForm, LoginForm } from "..";
import {
  AuthCardContainer,
  AuthCardFlip,
  AuthCardFront,
  AuthCardBack,
} from "./styles";

interface FormData {
  email: string;
  password: string;
}

interface AuthCardProps {
  onLogin?: (formData: FormData) => void;
  onRegister?: (formData: FormData) => void;
  loading?: boolean;
  error?: string | null;
}

const AuthCard: React.FC<AuthCardProps> = ({
  onLogin,
  onRegister,
  loading,
  error,
}) => {
  const [flipped, setFlipped] = useState<boolean>(false);

  const handleShowLogin = () => setFlipped(true);
  const handleShowRegister = () => setFlipped(false);

  return (
    <AuthCardContainer>
      <AuthCardFlip flipped={flipped}>
        <AuthCardFront>
          <RegisterForm
            onSubmit={onRegister}
            onLoginClick={handleShowLogin}
            loading={loading}
            error={error}
          />
        </AuthCardFront>
        <AuthCardBack>
          <LoginForm
            onSubmit={onLogin}
            onRegisterClick={handleShowRegister}
            loading={loading}
            error={error}
          />
        </AuthCardBack>
      </AuthCardFlip>
    </AuthCardContainer>
  );
};

export default AuthCard;
