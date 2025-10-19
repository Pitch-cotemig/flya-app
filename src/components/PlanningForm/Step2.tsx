import React, { useState } from "react";
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
  const [budgetInput, setBudgetInput] = useState(formData.orcamento || "");
  const [budgetError, setBudgetError] = useState("");

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

  // Função para formatar o valor como moeda brasileira
  const formatCurrency = (value: string) => {
    // Remove tudo que não é dígito
    const numericValue = value.replace(/\D/g, "");
    
    // Se não há valor, retorna vazio
    if (!numericValue) return "";
    
    // Converte para número e formata
    const number = parseInt(numericValue, 10);
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  // Função para lidar com mudanças no input de orçamento
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatCurrency(rawValue);
    
    setBudgetInput(formattedValue);
    
    // Validação mínima de R$ 2.000
    const numericValue = parseInt(rawValue.replace(/\D/g, ""), 10);
    if (numericValue > 0 && numericValue < 2000) {
      setBudgetError("O orçamento mínimo é de R$ 2.000");
    } else {
      setBudgetError("");
    }
    
    // Cria um evento sintético para o handleChange do pai
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name: "orcamento",
        value: formattedValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleChange(syntheticEvent);
  };

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
        Qual seu orçamento para esta viagem?
      </QuestionTitle>
      <div style={{ marginTop: "20px" }}>
        <div style={{ position: "relative" }}>
          <DollarSign 
            size={20} 
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255, 255, 255, 0.6)",
              zIndex: 1,
            }}
          />
          <input
            type="text"
            name="orcamento"
            value={budgetInput}
            onChange={handleBudgetChange}
            placeholder="Digite seu orçamento (ex: R$ 5.000)"
            style={{
              width: "100%",
              padding: "16px 20px 16px 48px",
              fontSize: "16px",
              borderRadius: "12px",
              border: "2px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#ffffff",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              outline: "none",
              fontFamily: "inherit",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#00bcd4";
              e.target.style.background = "rgba(255, 255, 255, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              e.target.style.background = "rgba(255, 255, 255, 0.05)";
            }}
          />
        </div>
        <p style={{
          marginTop: "8px",
          fontSize: "14px",
          color: "rgba(255, 255, 255, 0.6)",
          fontStyle: "italic"
        }}>
          💡 Dica: Inclua todos os gastos (hospedagem, transporte, alimentação, passeios)
        </p>
        {budgetError && (
          <p style={{
            marginTop: "8px",
            fontSize: "14px",
            color: "#ef4444",
            fontWeight: "500"
          }}>
            ⚠️ {budgetError}
          </p>
        )}
      </div>
    </>
  );
};

export default Step2;
