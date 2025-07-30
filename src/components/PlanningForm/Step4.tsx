import React from 'react';
import {
  QuestionTitle,
  OptionContainer,
  OptionLabel,
  CheckboxInput,
} from '../../pages/PlanningFormPage/styles';

interface Step4Props {
  formData: {
    clima: string[];
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step4: React.FC<Step4Props> = ({ formData, handleChange }) => {
  const climaOpcoes = ['Neve', 'Chuva', 'Ensolarado', 'Nublado'];

  return (
    <>
      <QuestionTitle>Qual(is) clima(s) você prefere em suas viagens?</QuestionTitle>
      <OptionContainer>
        {climaOpcoes.map((opcao) => (
          <OptionLabel
            key={opcao}
            className={formData.clima.includes(opcao) ? 'selected' : ''}
          >
            <CheckboxInput
              name="clima"
              value={opcao}
              checked={formData.clima.includes(opcao)}
              onChange={handleChange}
            />
            {opcao}
          </OptionLabel>
        ))}
      </OptionContainer>
    </>
  );
};

export default Step4; 