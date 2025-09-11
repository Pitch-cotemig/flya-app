import styled, { keyframes } from "styled-components";
import { colors } from "../../design-tokens/colors";

// Animação de voo suave da logo (subindo e descendo)
const logoFlight = keyframes`
  0% {
    transform: translateY(0px) rotate(-2deg);
  }
  25% {
    transform: translateY(-8px) rotate(1deg);
  }
  50% {
    transform: translateY(-12px) rotate(-1deg);
  }
  75% {
    transform: translateY(-8px) rotate(2deg);
  }
  100% {
    transform: translateY(0px) rotate(-2deg);
  }
`;

// Animação de pulso para o container
const containerPulse = keyframes`
  0%, 100% {
    background: ${colors.background.primary};
  }
  50% {
  }
`;

// Animação de fade para o texto
const textFade = keyframes`
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
`;

// Animação dos pontos de loading
const dotsAnimation = keyframes`
  0%, 20% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const LoadingContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${containerPulse} 2s ease-in-out infinite;
`;

export const FlyingLogo = styled.img<{ size: "small" | "medium" | "large" }>`
  width: ${(props) =>
    props.size === "small" ? "40px" : props.size === "large" ? "80px" : "60px"};
  height: ${(props) =>
    props.size === "small" ? "40px" : props.size === "large" ? "80px" : "60px"};
  filter: drop-shadow(0 0 10px ${colors.primary.cyan});
  animation: ${logoFlight} 2s ease-in-out infinite;
  margin-bottom: 24px;
`;

export const LoadingText = styled.p<{ size: "small" | "medium" | "large" }>`
  font-size: ${(props) =>
    props.size === "small"
      ? "0.875rem"
      : props.size === "large"
      ? "1.25rem"
      : "1rem"};
  font-weight: 500;
  color: ${colors.text.primary};
  text-align: center;
  animation: ${textFade} 1.5s ease-in-out infinite;
  margin-bottom: 8px;
`;

export const LoadingDots = styled.div`
  display: flex;
  gap: 4px;

  .dot {
    width: 6px;
    height: 6px;
    background: ${colors.primary.cyan};
    border-radius: 50%;
    animation: ${dotsAnimation} 1.4s ease-in-out infinite;

    &:nth-child(1) {
      animation-delay: 0s;
    }

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;

// Componentes não utilizados removidos para simplificar
export const CloudsContainer = styled.div`
  display: none;
`;

export const Cloud = styled.div<{ delay: number }>`
  display: none;
`;

export const SparkleContainer = styled.div`
  display: none;
`;

export const Sparkle = styled.div<{ delay: number }>`
  display: none;
`;

export const TrailEffect = styled.div`
  display: none;
`;
