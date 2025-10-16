import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  color: white;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  color: white;
`;

const SecurityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #475569;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: #1e293b;
`;

const SecurityLabel = styled.div`
  font-weight: 500;
`;

const SecurityButton = styled.button`
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #2563eb;
  }
`;

const SecuritySection: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // Carregar status atual do 2FA
  React.useEffect(() => {
    const loadStatus = async () => {
      try {
        const user = localStorage.getItem("user");
        if (user) {
          const userData = JSON.parse(user);
          // Por enquanto, assumir false - será carregado do backend depois
          setTwoFactorEnabled(false);
        }
      } catch (error) {
        console.error("Erro ao carregar status 2FA:", error);
      }
    };
    loadStatus();
  }, []);

  const toggle2FA = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        alert("Faça login novamente");
        return;
      }
      
      const response = await fetch("http://localhost:3000/auth/2fa/toggle", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();

      if (response.ok) {
        setTwoFactorEnabled(data.two_factor_enabled);
        alert(`2FA ${data.two_factor_enabled ? 'ativado' : 'desativado'} com sucesso!`);
      } else {
        console.error("Erro:", data);
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error("Erro ao alterar 2FA:", error);
      alert("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Configurações de Segurança</Title>
      
      <SecurityItem>
        <SecurityLabel>Alterar Senha</SecurityLabel>
        <SecurityButton>Alterar</SecurityButton>
      </SecurityItem>
      
      <SecurityItem>
        <SecurityLabel>Autenticação em Duas Etapas</SecurityLabel>
        <SecurityButton onClick={toggle2FA} disabled={loading}>
          {loading ? "..." : twoFactorEnabled ? "Desativar" : "Ativar"}
        </SecurityButton>
      </SecurityItem>
    </Container>
  );
};

export default SecuritySection;