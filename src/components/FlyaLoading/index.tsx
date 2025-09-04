import React from "react";
import flyaLogo from "../../assets/flyalogo.svg";
import {
  LoadingContainer,
  FlyingLogo,
  LoadingText,
  LoadingDots,
} from "./styles";

interface FlyaLoadingProps {
  text?: string;
  size?: "small" | "medium" | "large";
}

export const FlyaLoading: React.FC<FlyaLoadingProps> = ({
  text = "Carregando...",
  size = "medium",
}) => {
  return (
    <LoadingContainer>
      {/* Logo girando de forma simples */}
      <FlyingLogo src={flyaLogo} alt="Flya Logo" size={size} />

      {/* Texto simples */}
      <LoadingText size={size}>{text}</LoadingText>

      {/* Pontos animados */}
      <LoadingDots>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </LoadingDots>
    </LoadingContainer>
  );
};

export default FlyaLoading;
