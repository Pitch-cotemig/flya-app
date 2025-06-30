import React, { useState } from "react";
import { Button, Input } from "../../atoms";
import flyaLogo from "../../../assets/flyalogo.svg";
import "./LoginForm.css";

interface FormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit?: (formData: FormData) => void;
  onRegisterClick?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onRegisterClick }) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="logo-container">
        <img
          src={flyaLogo}
          alt="Flya Logo"
          className="flya-logo"
          style={{ width: 60, height: 60, marginBottom: 16 }}
        />
      </div>
      <h1 className="form-title">Login Flya</h1>
      <div className="form-group">
        <Input
          type="email"
          name="email"
          placeholder="Digite seu e-mail ou nome de usuário"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <Button type="submit" label="Login" className="register-button" />
      </div>
      <div className="login-link">
        <span className="login-text">Não tem uma conta? </span>
        <button
          type="button"
          className="login-button"
          onClick={onRegisterClick}
        >
          Cadastre-se
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
