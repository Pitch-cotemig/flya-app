import styled from "styled-components";

export const TwoFactorContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100vw;
  height: 100vh;
  background: #1c1c43;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

export const FormCard = styled.div`
  background: rgba(30, 41, 59, 0.8);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(10px);
  max-width: 400px;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormTitle = styled.h2`
  text-align: center;
  color: #3b82f6;
  margin-bottom: 8px;
  font-size: 2rem;
`;

export const InfoText = styled.p`
  text-align: center;
  color: #e2e8f0;
  font-size: 16px;
  margin-bottom: 24px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SubmitButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #2563eb;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 14px;
  text-align: center;
`;
