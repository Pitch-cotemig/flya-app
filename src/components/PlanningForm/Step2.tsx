import React from "react";
import {
  QuestionTitle,
  OptionContainer,
  OptionLabel,
  RadioInput,
} from "../../pages/PlanningFormPage/styles";
import styled from "styled-components";
import { Heart, Plane, DollarSign, Calendar, AlertCircle } from "lucide-react";

const DateInputContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const DateFieldWrapper = styled.div`
  flex: 1;
  min-width: 200px;
`;

const DateLabel = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DateInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${props => props.$hasError ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ef4444' : '#00bcd4'};
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0, 188, 212, 0.1)'};
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

interface Step2Props {
  formData: {
    pet: string;
    orcamento: string;
    dataInicio: string;
    dataFim: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step2: React.FC<Step2Props> = ({ formData, handleChange }) => {
  // Validação de datas
  const hasDateError = React.useMemo(() => {
    if (!formData.dataInicio || !formData.dataFim) return false;
    const dataInicio = new Date(formData.dataInicio);
    const dataFim = new Date(formData.dataFim);
    return dataFim < dataInicio;
  }, [formData.dataInicio, formData.dataFim]);

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

      <QuestionTitle style={{ marginTop: "40px" }}>
        <Calendar size={24} style={{ marginRight: "8px" }} />
        Quando você planeja viajar?
      </QuestionTitle>
      <DateInputContainer>
        <DateFieldWrapper>
          <DateLabel>
            <Calendar size={16} />
            Data de Início
          </DateLabel>
          <DateInput
            type="date"
            name="dataInicio"
            value={formData.dataInicio}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            $hasError={hasDateError}
          />
        </DateFieldWrapper>
        <DateFieldWrapper>
          <DateLabel>
            <Calendar size={16} />
            Data de Fim
          </DateLabel>
          <DateInput
            type="date"
            name="dataFim"
            value={formData.dataFim}
            onChange={handleChange}
            min={formData.dataInicio || new Date().toISOString().split("T")[0]}
            $hasError={hasDateError}
          />
        </DateFieldWrapper>
      </DateInputContainer>
      {hasDateError && (
        <ErrorMessage>
          <AlertCircle size={16} />
          A data de fim não pode ser anterior à data de início da viagem
        </ErrorMessage>
      )}
    </>
  );
};

export default Step2;
