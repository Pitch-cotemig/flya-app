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
    { value: 'Passear com a família', icon: '👨‍👩‍👧‍👦', description: 'Momentos especiais em família' },
    { value: 'Viajar a negócios', icon: '💼', description: 'Viagens corporativas e profissionais' },
    { value: 'Conhecer novos lugares', icon: '🌍', description: 'Explorar e descobrir o mundo' },
    { value: 'Ir a eventos', icon: '🎉', description: 'Shows, festivais e celebrações' },
  ];

  const destinos = [
    { value: 'Para alguma cidade Brasileira', icon: '🇧🇷', description: 'Descobrir as belezas do Brasil' },
    { value: 'Para o exterior', icon: '✈️', description: 'Aventura internacional' },
  ];

  return (
    <>
      <QuestionTitle>Qual o principal motivo da sua viagem? 🗺️</QuestionTitle>
      <OptionContainer>
        {motivos.map((motivo) => (
          <OptionLabel
            key={motivo.value}
            className={formData.motivo === motivo.value ? 'selected' : ''}
          >
            <RadioInput
              name="motivo"
              value={motivo.value}
              checked={formData.motivo === motivo.value}
              onChange={handleChange}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
              <span style={{ fontSize: '24px' }}>{motivo.icon}</span>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{motivo.value}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>{motivo.description}</div>
              </div>
            </div>
          </OptionLabel>
        ))}
      </OptionContainer>

      <QuestionTitle style={{ marginTop: '40px' }}>E o destino, será nacional ou internacional? 🌎</QuestionTitle>
      <OptionContainer>
        {destinos.map((destino) => (
          <OptionLabel
            key={destino.value}
            className={formData.destino === destino.value ? 'selected' : ''}
          >
            <RadioInput
              name="destino"
              value={destino.value}
              checked={formData.destino === destino.value}
              onChange={handleChange}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
              <span style={{ fontSize: '24px' }}>{destino.icon}</span>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{destino.value}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>{destino.description}</div>
              </div>
            </div>
          </OptionLabel>
        ))}
      </OptionContainer>
    </>
  );
};

export default Step1; 