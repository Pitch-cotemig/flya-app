import React from "react";
import {
  QuestionTitle,
  OptionContainer,
  OptionLabel,
  RadioInput,
} from "../../pages/PlanningFormPage/styles";
import { Heart, Plane, DollarSign } from "lucide-react";

interface Step2Props {
  formData: {
    pet: string;
    orcamento: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step2: React.FC<Step2Props> = ({ formData, handleChange }) => {
  const petOpcoes = [
    {
      value: "Sim",
      icon: <Heart size={24} />,
      description: "Seu amigo peludo vai junto!",
    },
    {
      value: "Não",
      icon: <Plane size={24} />,
      description: "Viagem solo ou com humanos",
    },
  ];

  const orcamentoOpcoes = [
    {
      value: "R$0 - R$4.000",
      icon: <DollarSign size={24} />,
      description: "Viagem econômica",
      color: "#4CAF50",
    },
    {
      value: "R$4.001 - R$7.000",
      icon: <DollarSign size={24} />,
      description: "Viagem confortável",
      color: "#FF9800",
    },
    {
      value: "R$7.001 - R$10.000+",
      icon: <DollarSign size={24} />,
      description: "Viagem premium",
      color: "#9C27B0",
    },
  ];

  return (
    <>
      <QuestionTitle>Você levará seu pet na viagem?</QuestionTitle>
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
              }}
            >
              <span style={{ fontSize: "28px", transition: "all 0.3s ease" }}>
                {opcao.icon}
              </span>
              <div style={{ flex: 1 }}>
                <div className="option-title">{opcao.value}</div>
                <div className="option-description">{opcao.description}</div>
              </div>
            </div>
          </OptionLabel>
        ))}
      </OptionContainer>

      <QuestionTitle style={{ marginTop: "40px" }}>
        Qual sua faixa de orçamento para esta viagem?{" "}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  color: opcao.color,
                  transition: "all 0.3s ease",
                }}
              >
                {opcao.icon}
              </span>
              <div style={{ flex: 1 }}>
                <div className="option-title">{opcao.value}</div>
                <div className="option-description">{opcao.description}</div>
              </div>
            </div>
          </OptionLabel>
        ))}
      </OptionContainer>
    </>
  );
};

export default Step2;
