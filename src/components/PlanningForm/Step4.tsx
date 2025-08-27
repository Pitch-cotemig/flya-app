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
  const climaOpcoes = [
    { value: 'Neve', icon: '❄️', description: 'Clima frio e nevado', color: '#E3F2FD' },
    { value: 'Chuva', icon: '🌧️', description: 'Clima chuvoso e úmido', color: '#BBDEFB' },
    { value: 'Ensolarado', icon: '☀️', description: 'Clima quente e ensolarado', color: '#FFF3E0' },
    { value: 'Nublado', icon: '☁️', description: 'Clima nublado e ameno', color: '#F3E5F5' },
  ];

  return (
    <>
      <QuestionTitle>Qual(is) clima(s) você prefere em suas viagens? 🌤️</QuestionTitle>
      <p style={{
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '14px',
        marginBottom: '30px'
      }}>
        Selecione quantas opções desejar ✨
      </p>
      <OptionContainer>
        {climaOpcoes.map((opcao) => (
          <OptionLabel
            key={opcao.value}
            className={formData.clima.includes(opcao.value) ? 'selected' : ''}
            style={{
              background: formData.clima.includes(opcao.value)
                ? `linear-gradient(135deg, ${opcao.color} 0%, rgba(255, 255, 255, 0.9) 100%)`
                : undefined,
              borderLeft: formData.clima.includes(opcao.value) ? `4px solid #00bcd4` : undefined
            }}
          >
            <CheckboxInput
              name="clima"
              value={opcao.value}
              checked={formData.clima.includes(opcao.value)}
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
    </>
  );
};

export default Step4; 