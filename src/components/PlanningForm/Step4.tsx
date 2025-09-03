import React from "react";
import {
  QuestionTitle,
  OptionContainer,
  OptionLabel,
  CheckboxInput,
} from "../../pages/PlanningFormPage/styles";
import {
  ClimateIcon,
  ContentContainer,
  TextContainer,
  SubtitleText,
} from "./Step4/styles";

interface Step4Props {
  formData: {
    clima: string[];
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step4: React.FC<Step4Props> = ({ formData, handleChange }) => {
  const climaOpcoes = [
    {
      value: "Neve",
      icon: "❄️",
      description: "Clima frio e nevado",
      color: "#E3F2FD",
    },
    {
      value: "Chuva",
      icon: "🌧️",
      description: "Clima chuvoso e úmido",
      color: "#BBDEFB",
    },
    {
      value: "Ensolarado",
      icon: "☀️",
      description: "Clima quente e ensolarado",
      color: "#FFF3E0",
    },
    {
      value: "Nublado",
      icon: "☁️",
      description: "Clima nublado e ameno",
      color: "#F3E5F5",
    },
  ];

  return (
    <>
      <QuestionTitle>
        Qual(is) clima(s) você prefere em suas viagens?{" "}
        <span className="emoji">🌤️</span>
      </QuestionTitle>
      <SubtitleText>Selecione quantas opções desejar ✨</SubtitleText>
      <OptionContainer>
        {climaOpcoes.map((opcao) => (
          <OptionLabel
            key={opcao.value}
            className={formData.clima.includes(opcao.value) ? "selected" : ""}
          >
            <CheckboxInput
              name="clima"
              value={opcao.value}
              checked={formData.clima.includes(opcao.value)}
              onChange={handleChange}
            />
            <ContentContainer>
              <ClimateIcon>{opcao.icon}</ClimateIcon>
              <TextContainer>
                <div className="option-title">{opcao.value}</div>
                <div className="option-description">{opcao.description}</div>
              </TextContainer>
            </ContentContainer>
          </OptionLabel>
        ))}
      </OptionContainer>
    </>
  );
};

export default Step4;
