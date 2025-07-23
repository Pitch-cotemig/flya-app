import React, { useState } from "react";
import { Input } from "..";
import flyaLogo from "../../assets/flyalogo.svg";
import {
  RegisterFormContainer,
  LogoContainer,
  FormTitle,
  FormGroup,
  LoginLink,
  LoginText,
  LoginButton,
  RegisterButton,
  ErrorMessage,
} from "./styles";

interface FormData {
  email: string;
  password: string;
}

interface RegisterFormProps {
  onSubmit?: (formData: FormData) => void;
  onLoginClick?: () => void;
  loading?: boolean;
  error?: string | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  onLoginClick,
  loading,
  error,
}) => {
  const [formData, setFormData] = useState<FormData>({
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
      onSubmit(formData);
    }
  };

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    }
  };

  return (
    <RegisterFormContainer onSubmit={handleSubmit}>
      <LogoContainer>
        <img
          src={flyaLogo}
          alt="Flya Logo"
          style={{ width: 60, height: 60, marginBottom: 16 }}
        />
      </LogoContainer>
      <FormTitle>Cadastro Flya</FormTitle>
      <FormGroup>
        <Input
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <FormGroup>
        <RegisterButton type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </RegisterButton>
      </FormGroup>
      <LoginLink>
        <LoginText>Já tem uma conta? </LoginText>
        <LoginButton type="button" onClick={handleLoginClick}>
          Faça login
        </LoginButton>
      </LoginLink>
    </RegisterFormContainer>
  );
};

export default RegisterForm;
