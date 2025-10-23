import React, { useState } from "react";
import {
  QuestionTitle,
  OptionContainer,
  OptionLabel,
  RadioInput,
} from "../../pages/PlanningFormPage/styles";
import { Heart, Plane, DollarSign, Calendar } from "lucide-react";

interface Step2Props {
  formData: {
    pet: string;
    orcamento: string;
    dias: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step2: React.FC<Step2Props> = ({ formData, handleChange }) => {
  const [daysError, setDaysError] = useState("");

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

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Permitir apenas números
    if (value === "" || /^\d+$/.test(value)) {
      const numValue = parseInt(value);

      if (value === "") {
        setDaysError("");
        handleChange(e);
      } else if (numValue < 1) {
        setDaysError("Mínimo de 1 dia");
        handleChange(e);
      } else if (numValue > 365) {
        setDaysError("Máximo de 365 dias");
        handleChange(e);
      } else {
        setDaysError("");
        handleChange(e);
      }
    }
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
        Quantos dias terá sua viagem?
      </QuestionTitle>
      <div
        style={{
          marginTop: "20px",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{ position: "relative" }}>
          <Calendar
            size={20}
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255, 255, 255, 0.6)",
              zIndex: 1,
            }}
          />
          <input
            type="text"
            name="dias"
            value={formData.dias}
            onChange={handleDaysChange}
            placeholder="Ex: 7 dias"
            style={{
              width: "100%",
              padding: "16px 20px 16px 60px",
              fontSize: "16px",
              borderRadius: "12px",
              border: "2px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#ffffff",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              outline: "none",
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
        <p
          style={{
            marginTop: "8px",
            fontSize: "14px",
            color: "rgba(255, 255, 255, 0.6)",
            fontStyle: "italic",
          }}
        >
          📅 Digite apenas números (ex: 7 para 7 dias)
        </p>
        {daysError && (
          <p
            style={{
              marginTop: "8px",
              fontSize: "14px",
              color: "#ff6b6b",
              fontWeight: "500",
            }}
          >
            ⚠️ {daysError}
          </p>
        )}
      </div>

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
