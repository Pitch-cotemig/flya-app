import { useState } from "react";
import RegisterForm from "./RegisterForm/RegisterForm";
import "./AuthCard.css";
import LoginForm from "./LoginForm/LoginForm";

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
