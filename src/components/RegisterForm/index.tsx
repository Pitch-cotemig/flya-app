import React, { useState } from "react";
import { Input } from "..";
import { useNavigate } from "react-router-dom";
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
  FormRow,
  FieldError,
} from "./styles";

interface FormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
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
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Validar username
    if (formData.username.length < 3) {
      errors.username = "Username deve ter pelo menos 3 caracteres";
    }

    // Validar nome
    if (formData.firstName.length < 2) {
      errors.firstName = "Nome deve ter pelo menos 2 caracteres";
    }

    // Validar sobrenome
    if (formData.lastName.length < 2) {
      errors.lastName = "Sobrenome deve ter pelo menos 2 caracteres";
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Email inválido";
    }

    // Validar data de nascimento
    if (!formData.birthDate) {
      errors.birthDate = "Data de nascimento é obrigatória";
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13) {
        errors.birthDate = "Você deve ter pelo menos 13 anos";
      }
    }

    // Validar senha
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Senha deve ter pelo menos 8 caracteres, uma maiúscula, uma minúscula, um número e um caractere especial";
    }

    // Validar confirmação de senha
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro de validação quando o usuário começa a digitar
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm() && onSubmit) {
      onSubmit(formData);
    }
  };

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    }
  };
  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <RegisterFormContainer onSubmit={handleSubmit}>
      <LogoContainer>
        <img src={flyaLogo} alt="Flya Logo" style={{ width: 60, height: 60 }} />
      </LogoContainer>
      <FormTitle>Cadastro Flya</FormTitle>

      <FormGroup>
        <Input
          type="text"
          name="username"
          placeholder="Nome de usuário"
          value={formData.username}
          onChange={handleInputChange}
          required
          error={validationErrors.username}
        />
        {validationErrors.username && (
          <FieldError>{validationErrors.username}</FieldError>
        )}
      </FormGroup>

      <FormRow>
        <FormGroup>
          <Input
            type="text"
            name="firstName"
            placeholder="Primeiro nome"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            error={validationErrors.firstName}
          />
          {validationErrors.firstName && (
            <FieldError>{validationErrors.firstName}</FieldError>
          )}
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="lastName"
            placeholder="Sobrenome"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            error={validationErrors.lastName}
          />
          {validationErrors.lastName && (
            <FieldError>{validationErrors.lastName}</FieldError>
          )}
        </FormGroup>
      </FormRow>

      <FormGroup>
        <Input
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={formData.email}
          onChange={handleInputChange}
          required
          error={validationErrors.email}
        />
        {validationErrors.email && (
          <FieldError>{validationErrors.email}</FieldError>
        )}
      </FormGroup>

      <FormGroup>
        <Input
          type="date"
          name="birthDate"
          placeholder="Data de nascimento"
          value={formData.birthDate}
          onChange={handleInputChange}
          required
          error={validationErrors.birthDate}
        />
        {validationErrors.birthDate && (
          <FieldError>{validationErrors.birthDate}</FieldError>
        )}
      </FormGroup>

      <FormGroup>
        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          value={formData.password}
          onChange={handleInputChange}
          required
          error={validationErrors.password}
        />
        {validationErrors.password && (
          <FieldError>{validationErrors.password}</FieldError>
        )}
      </FormGroup>

      <FormGroup>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirme sua senha"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          error={validationErrors.confirmPassword}
        />
        {validationErrors.confirmPassword && (
          <FieldError>{validationErrors.confirmPassword}</FieldError>
        )}
      </FormGroup>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FormGroup>
        <RegisterButton type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
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
