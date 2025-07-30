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


interface FinalStepProps {
  onClose: () => void;
}

const FinalStep: React.FC<FinalStepProps> = ({ onClose }) => {
  return (
    <FinalScreenContainer>
      <img src={logoPlaceholder} alt="Logo" />
      <h1>Done!</h1>
      <p>
        Your message has been sent successfully. Thank you for taking the time to
        share your valuable input with us.
      </p>
      <ContinueButton onClick={onClose}>Finish</ContinueButton>
    </FinalScreenContainer>
  );
};

export default FinalStep; 