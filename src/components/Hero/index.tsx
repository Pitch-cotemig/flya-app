import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeroContainer,
  HeroContent,
  HeroTitle,
  HeroForm,
  HeroInput,
  HeroButton,
  FloatingParticles,
} from "./styles";

const Hero: React.FC = () => {
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handlePlanClick = () => {
    navigate("/planejamento");
  };

  return (
    <HeroContainer>
      <FloatingParticles />
      <HeroContent>
        <HeroTitle>Sua viagem dos sonhos planejada com IA</HeroTitle>
      </HeroContent>
      <HeroForm>
        <HeroInput
          type="text"
          placeholder="Quanto você quer gastar?"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <HeroButton onClick={handlePlanClick}>Planejar</HeroButton>
      </HeroForm>
    </HeroContainer>
  );
};

export default Hero;
