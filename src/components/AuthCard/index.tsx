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
}

const AuthCard: React.FC<AuthCardProps> = ({ onLogin, onRegister }) => {
  const [flipped, setFlipped] = useState<boolean>(false);

  const handleShowLogin = () => setFlipped(true);
  const handleShowRegister = () => setFlipped(false);

  return (
    <AuthCardContainer>
      <AuthCardFlip flipped={flipped}>
        <AuthCardFront>
          <RegisterForm onSubmit={onRegister} onLoginClick={handleShowLogin} />
        </AuthCardFront>
        <AuthCardBack>
          <LoginForm onSubmit={onLogin} onRegisterClick={handleShowRegister} />
        </AuthCardBack>
      </AuthCardFlip>
    </AuthCardContainer>
  );
};

export default AuthCard;
