import React, { useState } from "react";
import { RegisterForm, LoginForm } from ".";
import "./AuthCard.css";

const AuthCard = ({ onLogin, onRegister }) => {
  const [flipped, setFlipped] = useState(false);

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
