import React from "react";
import {
  QuestionTitle,
  OptionContainer,
  OptionLabel,
  RadioInput,
} from "../../pages/PlanningFormPage/styles";
import {
  BudgetIcon,
  PetIcon,
  ContentContainer,
  TextContainer,
  SectionDivider,
} from "./Step2/styles";

interface Step2Props {
  formData: {
    pet: string;
    orcamento: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step2: React.FC<Step2Props> = ({ formData, handleChange }) => {
  const petOpcoes = [
    { value: "Sim", icon: "🐕", description: "Seu amigo peludo vai junto!" },
    { value: "Não", icon: "✈️", description: "Viagem solo ou com humanos" },
  ];

  const orcamentoOpcoes = [
    {
      value: "R$0 - R$4.000",
      icon: "💰",
      description: "Viagem econômica",
      color: "#4CAF50",
    },
    {
      value: "R$4.001 - R$7.000",
      icon: "💵",
      description: "Viagem confortável",
      color: "#FF9800",
    },
    {
      value: "R$7.001 - R$10.000+",
      icon: "💎",
      description: "Viagem premium",
      color: "#9C27B0",
    },
  ];

  return (
    <>
      <QuestionTitle>
        Você levará seu pet na viagem? <span className="emoji">🐾</span>
      </QuestionTitle>
      <OptionContainer>
        {petOpcoes.map((opcao) => (
          <OptionLabel
            key={opcao.value}
            className={formData.pet === opcao.value ? "selected" : ""}
          >
            <RadioInput
              name="pet"
              value={opcao.value}
              checked={formData.pet === opcao.value}
              onChange={handleChange}
            />
            <ContentContainer>
              <PetIcon>{opcao.icon}</PetIcon>
              <TextContainer>
                <div className="option-title">{opcao.value}</div>
                <div className="option-description">{opcao.description}</div>
              </TextContainer>
            </ContentContainer>
          </OptionLabel>
        ))}
      </OptionContainer>

      <SectionDivider />

      <QuestionTitle>
        Qual sua faixa de orçamento para esta viagem?{" "}
        <span className="emoji">💸</span>
      </QuestionTitle>
      <OptionContainer>
        {orcamentoOpcoes.map((opcao) => (
          <OptionLabel
            key={opcao.value}
            className={formData.orcamento === opcao.value ? "selected" : ""}
          >
            <RadioInput
              name="orcamento"
              value={opcao.value}
              checked={formData.orcamento === opcao.value}
              onChange={handleChange}
            />
            <ContentContainer>
              <BudgetIcon color={opcao.color}>{opcao.icon}</BudgetIcon>
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

export default Step2;
