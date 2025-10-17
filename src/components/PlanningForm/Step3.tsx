import React from "react";
import {
  QuestionTitle,
  OptionContainer,
  OptionLabel,
  RadioInput,
} from "../../pages/PlanningFormPage/styles";
import {
  User,
  Users,
  UserCheck,
  Users2,
  Car,
  Bus,
  Train,
  Plane,
} from "lucide-react";

interface Step3Props {
  formData: {
    acompanhantes: string;
    transporte: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step3: React.FC<Step3Props> = ({ formData, handleChange }) => {
  const acompanhantesOpcoes = [
    { value: "0", icon: <User size={24} />, description: "Viagem solo" },
    { value: "1", icon: <Users size={24} />, description: "A dois" },
    { value: "2/3", icon: <UserCheck size={24} />, description: "Em família" },
    { value: "4+", icon: <Users2 size={24} />, description: "Grande grupo" },
  ];

  const transporteOpcoes = [
    { value: "Não", icon: <Car size={24} />, description: "Carro próprio" },
    {
      value: "Sim, ônibus",
      icon: <Bus size={24} />,
      description: "Transporte rodoviário",
    },
    {
      value: "Sim, trem",
      icon: <Train size={24} />,
      description: "Transporte ferroviário",
    },
    {
      value: "Sim, avião",
      icon: <Plane size={24} />,
      description: "Transporte aéreo",
    },
  ];

  return (
    <>
      <QuestionTitle>Com quantos acompanhantes você viajará?</QuestionTitle>
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
