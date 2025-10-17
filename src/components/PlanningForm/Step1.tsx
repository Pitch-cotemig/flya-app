import React from "react";
import {
  QuestionTitle,
  OptionContainer,
  OptionLabel,
  RadioInput,
} from "../../pages/PlanningFormPage/styles";
import {
  Users,
  Briefcase,
  Globe,
  PartyPopper,
  MapPin,
  Plane,
} from "lucide-react";

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
      icon: <Users size={24} />,
      description: "Momentos especiais em família",
    },
    {
      value: "Viajar a negócios",
      icon: <Briefcase size={24} />,
      description: "Viagens corporativas e profissionais",
    },
    {
      value: "Conhecer novos lugares",
      icon: <Globe size={24} />,
      description: "Explorar e descobrir o mundo",
    },
    {
      value: "Ir a eventos",
      icon: <PartyPopper size={24} />,
      description: "Shows, festivais e celebrações",
    },
  ];

  const destinos = [
    {
      value: "Para alguma cidade Brasileira",
      icon: <MapPin size={24} />,
      description: "Descobrir as belezas do Brasil",
    },
    {
      value: "Para o exterior",
      icon: <Plane size={24} />,
      description: "Aventura internacional",
    },
  ];

  return (
    <>
      <QuestionTitle>Qual o principal motivo da sua viagem?</QuestionTitle>
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
              }}
            >
              <span style={{ fontSize: "28px", transition: "all 0.3s ease" }}>
                {motivo.icon}
              </span>
              <div style={{ flex: 1 }}>
                <div className="option-title">{motivo.value}</div>
                <div className="option-description">{motivo.description}</div>
              </div>
            </div>
          </OptionLabel>
        ))}
      </OptionContainer>

      <QuestionTitle style={{ marginTop: "40px" }}>
        E o destino, será nacional ou internacional?{" "}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
              }}
            >
              <span style={{ fontSize: "28px", transition: "all 0.3s ease" }}>
                {destino.icon}
              </span>
              <div style={{ flex: 1 }}>
                <div className="option-title">{destino.value}</div>
                <div className="option-description">{destino.description}</div>
              </div>
            </div>
          </OptionLabel>
        ))}
      </OptionContainer>
    </>
  );
};

export default Step1;
