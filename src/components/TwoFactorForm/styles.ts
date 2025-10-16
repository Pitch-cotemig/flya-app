import styled from "styled-components";

export const TwoFactorContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
  padding: 24px;
`;

export const FormTitle = styled.h2`
  text-align: center;
  color: #3b82f6;
  margin-bottom: 8px;
`;

export const InfoText = styled.p`
  text-align: center;
  color: #94a3b8;
  font-size: 14px;
  margin-bottom: 16px;
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