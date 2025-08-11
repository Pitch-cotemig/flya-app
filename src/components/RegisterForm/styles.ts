import styled from "styled-components";

export const RegisterFormContainer = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 2rem 1rem;
  overflow-y: auto;
`;

export const LogoContainer = styled.div`
  margin-bottom: 24px;
  text-align: center;
`;

export const FormTitle = styled.h1`
  color: #fff;
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 32px 0;
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const LoginLink = styled.div`
  margin-top: 24px;
  text-align: center;
  width: 100%;
`;

export const LoginText = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
`;

export const LoginButton = styled.button`
  background: none;
  border: none;
  color: #00bcd4;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 4px;
  transition: color 0.2s;

  &:hover {
    color: #00acc1;
  }
`;

export const RegisterButton = styled(LoginButton)`
  width: 100%;
  padding: 16px;
  background: #00bcd4;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  margin: 0;

  &:hover {
    background: #00acc1;
    color: white;
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
`;

export const FieldError = styled.p`
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 0;
`;
