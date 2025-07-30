import React from 'react';
import {
  QuestionTitle,
  OptionContainer,
  OptionLabel,
  RadioInput,
} from '../../pages/PlanningFormPage/styles';

interface Step3Props {
  formData: {
    acompanhantes: string;
    transporte: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step3: React.FC<Step3Props> = ({ formData, handleChange }) => {
  const acompanhantesOpcoes = ['0', '1', '2/3', '4+'];
  const transporteOpcoes = ['Não', 'Sim, ônibus', 'Sim, trem', 'Sim, avião'];

  return (
    <>
      <QuestionTitle>Com quantos acompanhantes você viajará?</QuestionTitle>
      <OptionContainer>
        {acompanhantesOpcoes.map((opcao) => (
          <OptionLabel
            key={opcao}
            className={formData.acompanhantes === opcao ? 'selected' : ''}
          >
            <RadioInput
              name="acompanhantes"
              value={opcao}
              checked={formData.acompanhantes === opcao}
              onChange={handleChange}
            />
            {opcao}
          </OptionLabel>
        ))}
      </OptionContainer>

      <QuestionTitle>Alguma preferência por meio de transporte?</QuestionTitle>
      <OptionContainer>
        {transporteOpcoes.map((opcao) => (
          <OptionLabel
            key={opcao}
            className={formData.transporte === opcao ? 'selected' : ''}
          >
            <RadioInput
              name="transporte"
              value={opcao}
              checked={formData.transporte === opcao}
              onChange={handleChange}
            />
            {opcao}
          </OptionLabel>
        ))}
      </OptionContainer>
    </>
  );
};

export default Step3; 