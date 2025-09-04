import React, { useState } from "react";
import styled from "styled-components";
import { FlyaLoading } from "../../components/FlyaLoading";
import { colors } from "../../design-tokens/colors";

const TestContainer = styled.div`
  min-height: 100vh;
  background: ${colors.background.primary};
  padding: 40px;
  font-family: "Inter", sans-serif;
`;

const TestHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    color: ${colors.text.primary};
    font-size: 2rem;
    margin-bottom: 16px;
  }

  p {
    color: ${colors.text.muted};
    font-size: 1rem;
  }
`;

const TestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TestCard = styled.div`
  background: ${colors.background.primaryAlpha};
  backdrop-filter: blur(12px);
  border: 1px solid ${colors.alpha.white01};
  border-radius: 16px;
  padding: 24px;
  text-align: center;

  h3 {
    color: ${colors.text.primary};
    margin-bottom: 16px;
    font-size: 1.25rem;
  }

  p {
    color: ${colors.text.muted};
    margin-bottom: 20px;
    font-size: 0.875rem;
  }
`;

const TestButton = styled.button`
  background: ${colors.gradients.primary};
  color: ${colors.text.primary};
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.cyan};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
`;

const FlyaLoadingTest: React.FC = () => {
  const [activeTest, setActiveTest] = useState<string | null>(null);

  const startTest = (testType: string, duration: number = 5000) => {
    setActiveTest(testType);
    setTimeout(() => {
      setActiveTest(null);
    }, duration);
  };

  return (
    <TestContainer>
      <TestHeader>
        <h1>🚀 Teste do FlyaLoading</h1>
        <p>
          Clique nos botões para testar diferentes variações do loading
          espalhafatoso!
        </p>
      </TestHeader>

      <TestGrid>
        <TestCard>
          <h3>Loading Padrão</h3>
          <p>Tamanho médio com texto padrão</p>
          <TestButton
            onClick={() => startTest("default")}
            disabled={!!activeTest}
          >
            Testar Loading Padrão
          </TestButton>
        </TestCard>

        <TestCard>
          <h3>Loading Pequeno</h3>
          <p>Tamanho pequeno para modais</p>
          <TestButton
            onClick={() => startTest("small")}
            disabled={!!activeTest}
          >
            Testar Loading Pequeno
          </TestButton>
        </TestCard>

        <TestCard>
          <h3>Loading Grande</h3>
          <p>Tamanho grande para páginas principais</p>
          <TestButton
            onClick={() => startTest("large")}
            disabled={!!activeTest}
          >
            Testar Loading Grande
          </TestButton>
        </TestCard>

        <TestCard>
          <h3>Loading Personalizado</h3>
          <p>Com texto personalizado de viagem</p>
          <TestButton
            onClick={() => startTest("custom")}
            disabled={!!activeTest}
          >
            Testar Loading Personalizado
          </TestButton>
        </TestCard>

        <TestCard>
          <h3>Loading Longo</h3>
          <p>Teste por 10 segundos</p>
          <TestButton
            onClick={() => startTest("long", 10000)}
            disabled={!!activeTest}
          >
            Testar Loading Longo
          </TestButton>
        </TestCard>

        <TestCard>
          <h3>Loading Rápido</h3>
          <p>Teste por 2 segundos</p>
          <TestButton
            onClick={() => startTest("quick", 2000)}
            disabled={!!activeTest}
          >
            Testar Loading Rápido
          </TestButton>
        </TestCard>
      </TestGrid>

      {/* Overlay de Loading */}
      {activeTest && (
        <LoadingOverlay>
          {activeTest === "default" && <FlyaLoading />}
          {activeTest === "small" && (
            <FlyaLoading text="Carregando..." size="small" />
          )}
          {activeTest === "large" && (
            <FlyaLoading text="Carregando suas aventuras..." size="large" />
          )}
          {activeTest === "custom" && (
            <FlyaLoading
              text="Preparando sua jornada dos sonhos... ✈️🌟"
              size="medium"
            />
          )}
          {(activeTest === "long" || activeTest === "quick") && (
            <FlyaLoading
              text="Criando experiências inesquecíveis..."
              size="large"
            />
          )}
        </LoadingOverlay>
      )}
    </TestContainer>
  );
};

export default FlyaLoadingTest;
