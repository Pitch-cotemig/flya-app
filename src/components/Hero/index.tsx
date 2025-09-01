import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../services/authService";
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
  const navigate = useNavigate();

  const handlePlanClick = () => {
    navigate("/planejamento");
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

  return (
    <HeroContainer>
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
