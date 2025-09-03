import React from "react";
import {
  QuestionTitle,
  OptionContainer,
  OptionLabel,
  RadioInput,
} from "../../pages/PlanningFormPage/styles";
import {
  TravelIcon,
  ContentContainer,
  TextContainer,
  SectionDivider,
} from "./Step1/styles";

interface Step1Props {
  formData: {
    motivo: string;
    destino: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step1: React.FC<Step1Props> = ({ formData, handleChange }) => {
  const motivos = [
    {
      value: "Passear com a família",
      icon: "👨‍👩‍👧‍👦",
      description: "Momentos especiais em família",
    },
    {
      value: "Viajar a negócios",
      icon: "💼",
      description: "Viagens corporativas e profissionais",
    },
    {
      value: "Conhecer novos lugares",
      icon: "🌍",
      description: "Explorar e descobrir o mundo",
    },
    {
      value: "Ir a eventos",
      icon: "🎉",
      description: "Shows, festivais e celebrações",
    },
  ];

  const destinos = [
    {
      value: "Para alguma cidade Brasileira",
      icon: "🇧🇷",
      description: "Descobrir as belezas do Brasil",
    },
    {
      value: "Para o exterior",
      icon: "✈️",
      description: "Aventura internacional",
    },
  ];

  return (
    <>
      <QuestionTitle>
        Qual o principal motivo da sua viagem? <span className="emoji">🗺️</span>
      </QuestionTitle>
      <OptionContainer>
        {motivos.map((motivo) => (
          <OptionLabel
            key={motivo.value}
            className={formData.motivo === motivo.value ? "selected" : ""}
          >
            <RadioInput
              name="motivo"
              value={motivo.value}
              checked={formData.motivo === motivo.value}
              onChange={handleChange}
            />
            <ContentContainer>
              <TravelIcon>{motivo.icon}</TravelIcon>
              <TextContainer>
                <div className="option-title">{motivo.value}</div>
                <div className="option-description">{motivo.description}</div>
              </TextContainer>
            </ContentContainer>
          </OptionLabel>
        ))}
      </OptionContainer>

      <SectionDivider />

      <QuestionTitle>
        E o destino, será nacional ou internacional?{" "}
        <span className="emoji">🌎</span>
      </QuestionTitle>
      <OptionContainer>
        {destinos.map((destino) => (
          <OptionLabel
            key={destino.value}
            className={formData.destino === destino.value ? "selected" : ""}
          >
            <RadioInput
              name="destino"
              value={destino.value}
              checked={formData.destino === destino.value}
              onChange={handleChange}
            />
            <ContentContainer>
              <TravelIcon>{destino.icon}</TravelIcon>
              <TextContainer>
                <div className="option-title">{destino.value}</div>
                <div className="option-description">{destino.description}</div>
              </TextContainer>
            </ContentContainer>
          </OptionLabel>
        ))}
      </OptionContainer>
    </>
  );
};

export default Step1;
