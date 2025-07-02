import React, { useState } from "react";
import { Button, Input } from "../../atoms";
import flyaLogo from "../../../assets/flyalogo.svg";
import "./RegisterForm.css";

interface FormData {
  nome: string;
  email: string;
  password: string;
}

interface RegisterFormProps {
  onSubmit?: (formData: FormData) => void;
  onLoginClick?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  onLoginClick,
}) => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData); // 👈 Agora inclui nome
    }
  };

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="logo-container">
        <img
          src={flyaLogo}
          alt="Flya Logo"
          className="flya-logo"
          style={{ width: 60, height: 60, marginBottom: 16 }}
        />
      </div>

      <h1 className="form-title">Cadastro Flya</h1>

      <div className="form-group">
        <Input
          type="text"
          name="nome"
          placeholder="Digite seu nome completo"
          value={formData.nome}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <Input
          type="text"
          name="nome"
          placeholder="Digite seu nome completo"
          value={formData.nome}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <Input
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
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
        <Button type="submit" label="Cadastre-se" className="register-button" />
      </div>

      <div className="login-link">
        <span className="login-text">Já tem uma conta? </span>
        <button
          type="button"
          className="login-button"
          onClick={handleLoginClick}
        >
          Faça login
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
