import React from "react";
import {
  QuestionTitle,
  OptionContainer,
  OptionLabel,
  RadioInput,
} from "../../pages/PlanningFormPage/styles";

interface Step3Props {
  formData: {
    acompanhantes: string;
    transporte: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step3: React.FC<Step3Props> = ({ formData, handleChange }) => {
  const acompanhantesOpcoes = [
    { value: "0", icon: "👤", description: "Viagem solo" },
    { value: "1", icon: "👥", description: "A dois" },
    { value: "2/3", icon: "👨‍👩‍👧", description: "Em família" },
    { value: "4+", icon: "👨‍👩‍👧‍👦", description: "Grande grupo" },
  ];

  const transporteOpcoes = [
    { value: "Não", icon: "🚗", description: "Carro próprio" },
    { value: "Sim, ônibus", icon: "🚌", description: "Transporte rodoviário" },
    { value: "Sim, trem", icon: "🚂", description: "Transporte ferroviário" },
    { value: "Sim, avião", icon: "✈️", description: "Transporte aéreo" },
  ];

  return (
    <>
      <QuestionTitle>
        Com quantos acompanhantes você viajará?
      </QuestionTitle>
      <OptionContainer>
        {acompanhantesOpcoes.map((opcao) => (
          <OptionLabel
            key={opcao.value}
            className={formData.acompanhantes === opcao.value ? "selected" : ""}
          >
            <RadioInput
              name="acompanhantes"
              value={opcao.value}
              checked={formData.acompanhantes === opcao.value}
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
                <div className="option-title">
                  {opcao.value === "0"
                    ? "Sozinho"
                    : opcao.value === "1"
                    ? "1 acompanhante"
                    : opcao.value === "2/3"
                    ? "2-3 acompanhantes"
                    : "4+ acompanhantes"}
                </div>
                <div className="option-description">{opcao.description}</div>
              </div>
            </div>
          </OptionLabel>
        ))}
      </OptionContainer>

      <QuestionTitle style={{ marginTop: "40px" }}>
        Alguma preferência por meio de transporte?
      </QuestionTitle>
      <OptionContainer>
        {transporteOpcoes.map((opcao) => (
          <OptionLabel
            key={opcao.value}
            className={formData.transporte === opcao.value ? "selected" : ""}
          >
            <RadioInput
              name="transporte"
              value={opcao.value}
              checked={formData.transporte === opcao.value}
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
    </>
  );
};

export default Step3;
