import React from 'react';
import {
  QuestionTitle,
  OptionContainer,
  OptionLabel,
  RadioInput,
} from '../../pages/PlanningFormPage/styles';

interface Step2Props {
  formData: {
    pet: string;
    orcamento: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step2: React.FC<Step2Props> = ({ formData, handleChange }) => {
  const petOpcoes = ['Sim', 'Não'];
  const orcamentoOpcoes = [
    'R$0 - R$4.000',
    'R$4.001 - R$7.000',
    'R$7.001 - R$10.000+',
  ];

  return (
    <>
      <QuestionTitle>Você levará seu pet na viagem?</QuestionTitle>
      <OptionContainer>
        {petOpcoes.map((opcao) => (
          <OptionLabel
            key={opcao}
            className={formData.pet === opcao ? 'selected' : ''}
          >
            <RadioInput
              name="pet"
              value={opcao}
              checked={formData.pet === opcao}
              onChange={handleChange}
            />
            {opcao}
          </OptionLabel>
        ))}
      </OptionContainer>

      <QuestionTitle>Qual sua faixa de orçamento para esta viagem?</QuestionTitle>
      <OptionContainer>
        {orcamentoOpcoes.map((opcao) => (
          <OptionLabel
            key={opcao}
            className={formData.orcamento === opcao ? 'selected' : ''}
          >
            <RadioInput
              name="orcamento"
              value={opcao}
              checked={formData.orcamento === opcao}
              onChange={handleChange}
            />
            {opcao}
          </OptionLabel>
        ))}
      </OptionContainer>
    </>
  );
};

export default Step2; 