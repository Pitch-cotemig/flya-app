import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px); // Ajusta para altura do header/footer
  padding: 40px 24px;
  background: linear-gradient(145deg, #2a215a 0%, #4a3a96 100%);
  color: #ffffff;
`;

export const FormContainer = styled.div`
  background-color: #1e1548;
  padding: 40px;
  border-radius: 24px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

export const StepIndicator = styled.p`
  text-align: right;
  font-size: 14px;
  color: #a9a1d4;
  margin-bottom: 20px;
`;

export const QuestionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 32px;
  text-align: left;
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

export const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 18px;
  background-color: #2a215a;
  border-radius: 12px;
  border: 1px solid #4a3a96;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #8a7de4;
  }

  &.selected {
    background-color: #8a7de4;
    border-color: #8a7de4;
  }
`;

export const RadioInput = styled.input.attrs({ type: 'radio' })`
  margin-right: 12px;
  accent-color: #fff;
  width: 18px;
  height: 18px;
`;

export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 12px;
  accent-color: #8a7de4;
  width: 18px;
  height: 18px;
  border-radius: 4px;
`;

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const BaseButton = styled.button`
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

export const BackButton = styled(BaseButton)`
  background-color: #4a3a96;
  color: #fff;

  &:hover {
    background-color: #5a4aae;
  }
`;

export const ContinueButton = styled(BaseButton)`
  background-color: #fff;
  color: #1e1548;
  
  &:hover {
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const InitialScreenContainer = styled.div`
  text-align: center;

  h1 {
    font-size: 48px;
    margin-bottom: 16px;
  }

  p {
    font-size: 18px;
    color: #a9a1d4;
    margin-bottom: 32px;
  }
`;
