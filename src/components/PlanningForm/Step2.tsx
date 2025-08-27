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
  const petOpcoes = [
    { value: 'Sim', icon: '🐕', description: 'Seu amigo peludo vai junto!' },
    { value: 'Não', icon: '✈️', description: 'Viagem solo ou com humanos' },
  ];

  const orcamentoOpcoes = [
    { value: 'R$0 - R$4.000', icon: '💰', description: 'Viagem econômica', color: '#4CAF50' },
    { value: 'R$4.001 - R$7.000', icon: '💵', description: 'Viagem confortável', color: '#FF9800' },
    { value: 'R$7.001 - R$10.000+', icon: '💎', description: 'Viagem premium', color: '#9C27B0' },
  ];

  return (
    <>
      <QuestionTitle>Você levará seu pet na viagem? 🐾</QuestionTitle>
      <OptionContainer>
        {petOpcoes.map((opcao) => (
          <OptionLabel
            key={opcao.value}
            className={formData.pet === opcao.value ? 'selected' : ''}
          >
            <RadioInput
              name="pet"
              value={opcao.value}
              checked={formData.pet === opcao.value}
              onChange={handleChange}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
              <span style={{ fontSize: '24px' }}>{opcao.icon}</span>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{opcao.value}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>{opcao.description}</div>
              </div>
            </div>
          </OptionLabel>
        ))}
      </OptionContainer>

      <QuestionTitle style={{ marginTop: '40px' }}>Qual sua faixa de orçamento para esta viagem? 💸</QuestionTitle>
      <OptionContainer>
        {orcamentoOpcoes.map((opcao) => (
          <OptionLabel
            key={opcao.value}
            className={formData.orcamento === opcao.value ? 'selected' : ''}
            style={{
              borderLeft: formData.orcamento === opcao.value ? `4px solid ${opcao.color}` : undefined
            }}
          >
            <RadioInput
              name="orcamento"
              value={opcao.value}
              checked={formData.orcamento === opcao.value}
              onChange={handleChange}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
              <span style={{ fontSize: '24px', color: opcao.color }}>{opcao.icon}</span>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{opcao.value}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>{opcao.description}</div>
              </div>
            </div>
          </OptionLabel>
        ))}
      </OptionContainer>
    </>
  );
};

export default Step2; 