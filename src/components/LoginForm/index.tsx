import React, { useState } from "react";
import { Input } from "..";
import flyaLogo from "../../assets/flyalogo.svg";
import {
  LoginFormContainer,
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

interface LoginFormProps {
  onSubmit?: (formData: FormData) => void;
  onRegisterClick?: () => void;
  loading?: boolean;
  error?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onRegisterClick,
  loading,
  error,
}) => {
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
    <LoginFormContainer onSubmit={handleSubmit}>
      <LogoContainer>
        <img
          src={flyaLogo}
          alt="Flya Logo"
          style={{ width: 60, height: 60, marginBottom: 16 }}
        />
      </LogoContainer>
      <FormTitle>Login Flya</FormTitle>
      <FormGroup>
        <Input
          type="email"
          name="email"
          placeholder="Digite seu e-mail ou nome de usuário"
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
          {loading ? 'Carregando...' : 'Login'}
        </RegisterButton>
      </FormGroup>
      <LoginLink>
        <LoginText>Não tem uma conta? </LoginText>
        <LoginButton type="button" onClick={onRegisterClick}>
          Cadastre-se
        </LoginButton>
      </LoginLink>
    </LoginFormContainer>
  );
};

export default LoginForm;
