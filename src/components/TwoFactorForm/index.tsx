import React, { useState } from "react";
import { Input } from "..";
import {
  TwoFactorContainer,
  FormTitle,
  FormGroup,
  SubmitButton,
  ErrorMessage,
  InfoText,
} from "./styles";

interface TwoFactorFormProps {
  email: string;
  onSubmit: (code: string) => void;
  loading?: boolean;
  error?: string | null;
}

const TwoFactorForm: React.FC<TwoFactorFormProps> = ({
  email,
  onSubmit,
  loading,
  error,
}) => {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(code);
  };

  return (
    <TwoFactorContainer onSubmit={handleSubmit}>
      <FormTitle>Verificação em Duas Etapas</FormTitle>
      <InfoText>
        Enviamos um código de 6 dígitos para {email}
      </InfoText>
      
      <FormGroup>
        <Input
          type="text"
          placeholder="Digite o código de 6 dígitos"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          required
        />
      </FormGroup>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <FormGroup>
        <SubmitButton type="submit" disabled={loading || code.length !== 6}>
          {loading ? "Verificando..." : "Verificar"}
        </SubmitButton>
      </FormGroup>
    </TwoFactorContainer>
  );
};

export default TwoFactorForm;