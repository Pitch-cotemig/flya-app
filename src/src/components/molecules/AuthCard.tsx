import { useState } from "react";
import RegisterForm from "./RegisterForm/RegisterForm";
import "./AuthCard.css";
import LoginForm from "./LoginForm/LoginForm";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData extends LoginData {
  nome: string;
}

interface AuthCardProps {
  onLogin?: (formData: LoginData) => void;
  onRegister?: (formData: SignupData) => void;
}

const AuthCard: React.FC<AuthCardProps> = ({ onLogin, onRegister }) => {
  const [flipped, setFlipped] = useState<boolean>(false);

  const handleShowLogin = () => setFlipped(true);
  const handleShowRegister = () => setFlipped(false);

  return (
    <div className="auth-card-flip-container">
      <div className={`auth-card-flip${flipped ? " flipped" : ""}`}>
        <div className="auth-card-face auth-card-front">
          <RegisterForm onSubmit={onRegister} onLoginClick={handleShowLogin} />
        </div>
        <div className="auth-card-face auth-card-back">
          <LoginForm onSubmit={onLogin} onRegisterClick={handleShowRegister} />
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
