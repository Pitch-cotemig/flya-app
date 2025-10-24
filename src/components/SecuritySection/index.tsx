import React, { useState } from "react";
import styled from "styled-components";
import { Smartphone } from "lucide-react";
import { colors } from "../../design-tokens/colors";

const SecurityCard = styled.div`
  background: ${colors.background.glassSoft};
  border-radius: 16px;
  border: 1px solid ${colors.border.white};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.border.whiteStrong};
    box-shadow: ${colors.shadow.lg};
  }
`;

const SecurityCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid ${colors.border.white};
`;

const SecurityCardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${colors.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.text.primary};
  box-shadow: ${colors.shadow.cyan};
`;

const SecurityCardTitle = styled.h3`
  color: ${colors.text.primary};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;

const SecurityCardDescription = styled.p`
  color: ${colors.text.primaryAlpha80};
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
`;

const SecurityCardContent = styled.div`
  padding: 1.5rem;
`;

const TwoFactorSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const TwoFactorStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  color: ${colors.text.primary};
`;

const StatusIndicator = styled.div<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $active }) => $active ? colors.state.success : colors.neutral.gray500};
  box-shadow: 0 0 0 2px ${({ $active }) => ($active ? colors.alpha.cyan02 : colors.alpha.white01)};
`;

const ActionButton = styled.button<{ variant?: "primary" | "outline" }>`
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: ${({ variant }) => variant === "outline" ? `1px solid ${colors.border.white}` : "none"};
  background: ${({ variant }) => variant === "outline" ? "transparent" : colors.gradients.primary};
  color: ${colors.text.primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ variant }) => variant === "outline" ? colors.background.glassStrong : colors.gradients.cyanHover};
    transform: translateY(-2px);
    box-shadow: ${({ variant }) => variant === "outline" ? colors.shadow.lg : colors.shadow.cyan};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecuritySection: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // Carregar status atual do 2FA
  React.useEffect(() => {
    const loadStatus = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log("Carregando status 2FA, token:", token ? "Presente" : "Ausente");
        if (!token) return;
        
        const response = await fetch("http://localhost:3000/auth/2fa/status", {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });
        
        console.log("Status response:", response.status);
        if (response.ok) {
          const data = await response.json();
          console.log("Status 2FA carregado:", data);
          setTwoFactorEnabled(data.two_factor_enabled);
        } else {
          console.log("Erro ao carregar status:", await response.text());
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
      const token = localStorage.getItem("authToken");
      console.log("Token encontrado:", token ? "Sim" : "Não");
      
      if (!token) {
        alert("Faça login novamente");
        return;
      }
      
      console.log("Fazendo requisição para toggle 2FA...");
      const response = await fetch("http://localhost:3000/auth/2fa/toggle", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });

      console.log("Status da resposta:", response.status);
      const data = await response.json();
      console.log("Dados da resposta:", data);

      if (response.ok) {
        setTwoFactorEnabled(data.two_factor_enabled);
        alert(`2FA ${data.two_factor_enabled ? 'ativado' : 'desativado'} com sucesso!`);
      } else {
        console.error("Erro:", data);
        if (response.status === 401) {
          alert("Sessão expirada. Faça login novamente.");
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          window.location.href = "/auth";
        } else {
          alert(`Erro: ${data.message || 'Erro desconhecido'}`);
        }
      }
    } catch (error) {
      console.error("Erro ao alterar 2FA:", error);
      alert("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SecurityCard>
      <SecurityCardHeader>
        <SecurityCardIcon>
          <Smartphone size={24} />
        </SecurityCardIcon>
        <div>
          <SecurityCardTitle>Autenticação de Dois Fatores</SecurityCardTitle>
          <SecurityCardDescription>
            Adicione uma camada extra de segurança à sua conta
          </SecurityCardDescription>
        </div>
      </SecurityCardHeader>

      <SecurityCardContent>
        <TwoFactorSection>
          <TwoFactorStatus>
            <StatusIndicator $active={twoFactorEnabled} />
            <span>{twoFactorEnabled ? "Ativado" : "Desativado"}</span>
          </TwoFactorStatus>

          <ActionButton
            variant={twoFactorEnabled ? "outline" : "primary"}
            onClick={toggle2FA}
            disabled={loading}
          >
            {loading ? "Configurando..." : twoFactorEnabled ? "Desativar 2FA" : "Ativar 2FA"}
          </ActionButton>
        </TwoFactorSection>

        {twoFactorEnabled && (
          <div style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: colors.alpha.cyan01,
            borderRadius: "12px",
          }}>
            <p style={{
              color: colors.text.primary,
              margin: 0,
              fontSize: "0.875rem",
            }}>
              ✓ Sua conta está protegida com autenticação de dois fatores
            </p>
          </div>
        )}
      </SecurityCardContent>
    </SecurityCard>
  );
};

export default SecuritySection;