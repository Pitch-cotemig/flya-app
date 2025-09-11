import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../services/authService";
import { FlyaLoading } from "../FlyaLoading";
import {
  HeroContainer,
  HeroContent,
  HeroTitle,
  HeroForm,
  HeroInput,
  HeroButton,
  FloatingParticles,
} from "./styles";

interface HeroProps {
  user?: User | null;
}

const Hero: React.FC<HeroProps> = ({ user }) => {
  const [budget, setBudget] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  // Preload da imagem principal com timeout
  useEffect(() => {
    const img = new Image();
    const timeout = setTimeout(() => {
      // Se demorar mais que 2 segundos, mostra mesmo sem a imagem
      setImageLoaded(true);
    }, 2000);

    img.onload = () => {
      clearTimeout(timeout);
      setImageLoaded(true);
    };

    img.onerror = () => {
      clearTimeout(timeout);
      console.warn("Erro ao carregar imagem principal, usando fallback");
      setImageLoaded(true);
    };

    img.src = "/images/mungyu-kim-Ex57cKpwdnE-unsplash.jpg";

    return () => clearTimeout(timeout);
  }, []);

  const handlePlanClick = () => {
    navigate("/Planejamento");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePlanClick();
    }
  };

  const getTitle = () => {
    if (user) {
      return `Olá ${user.firstName}! Planeje sua viagem dos sonhos com IA`;
    }
    return "Sua viagem dos sonhos planejada com IA";
  };

  // Loading enquanto a imagem carrega
  if (!imageLoaded) {
    return <FlyaLoading text="Preparando sua experiência..." size="large" />;
  }

  return (
    <HeroContainer imageLoaded={imageLoaded}>
      <FloatingParticles />
      <HeroContent>
        <HeroTitle>{getTitle()}</HeroTitle>
      </HeroContent>
      <HeroForm>
        <HeroInput
          type="text"
          placeholder="Quanto você quer gastar?"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <HeroButton onClick={handlePlanClick}>Planejar</HeroButton>
      </HeroForm>
    </HeroContainer>
  );
};

export default Hero;
