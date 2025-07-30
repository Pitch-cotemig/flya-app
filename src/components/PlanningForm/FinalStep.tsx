import React from 'react';
import styled from 'styled-components';
import { ContinueButton } from '../../pages/PlanningFormPage/styles';
import logoPlaceholder from '../../../public/images/logo-placeholder.svg';

const FinalScreenContainer = styled.div`
  text-align: center;
  padding: 40px 0;

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 24px;
    opacity: 0.7;
  }
  
  h1 {
    font-size: 48px;
    margin-bottom: 16px;
    color: #fff;
  }

  p {
    font-size: 18px;
    color: #a9a1d4;
    margin-bottom: 32px;
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const PlanResult = styled.pre`
  background-color: #2a215a;
  padding: 20px;
  border-radius: 12px;
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #dcd7ff;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 32px;
`;


interface FinalStepProps {
  plan: string | null;
  onClose: () => void;
}

const FinalStep: React.FC<FinalStepProps> = ({ plan, onClose }) => {
  return (
    <FinalScreenContainer>
      <img src={logoPlaceholder} alt="Logo" />
      <h1>Seu Roteiro está Pronto!</h1>
      {plan ? (
        <PlanResult>{plan}</PlanResult>
      ) : (
        <p>
          Ocorreu um erro ao gerar seu plano. Por favor, tente novamente.
        </p>
      )}
      <ContinueButton onClick={onClose}>Finalizar</ContinueButton>
    </FinalScreenContainer>
  );
};

export default FinalStep; 