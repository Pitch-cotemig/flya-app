import React from 'react';
import {
  QuestionTitle,
  OptionContainer,
  OptionLabel,
  RadioInput,
} from '../../pages/PlanningFormPage/styles';

interface Step1Props {
  formData: {
    motivo: string;
    destino: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step1: React.FC<Step1Props> = ({ formData, handleChange }) => {
  const motivos = [
    'Passear com a família',
    'Viajar a negócios',
    'Conhecer novos lugares',
    'Ir a eventos',
  ];

  const destinos = ['Para alguma cidade Brasileira', 'Para o exterior'];

  return (
    <>
      <QuestionTitle>Qual o principal motivo da sua viagem?</QuestionTitle>
      <OptionContainer>
        {motivos.map((motivo) => (
          <OptionLabel
            key={motivo}
            className={formData.motivo === motivo ? 'selected' : ''}
          >
            <RadioInput
              name="motivo"
              value={motivo}
              checked={formData.motivo === motivo}
              onChange={handleChange}
            />
            {motivo}
          </OptionLabel>
        ))}
      </OptionContainer>

      <QuestionTitle>E o destino, será nacional ou internacional?</QuestionTitle>
      <OptionContainer>
        {destinos.map((destino) => (
          <OptionLabel
            key={destino}
            className={formData.destino === destino ? 'selected' : ''}
          >
            <RadioInput
              name="destino"
              value={destino}
              checked={formData.destino === destino}
              onChange={handleChange}
            />
            {destino}
          </OptionLabel>
        ))}
      </OptionContainer>
    </>
  );
};

export default Step1; 