import styled from "styled-components";

export const RegisterFormContainer = styled.form`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  padding: 0 0.5rem;

  @media (min-width: 480px) {
    max-width: 500px;
    padding: 0;
  }
`;

export const LogoContainer = styled.div`
  margin-bottom: 8px;
  text-align: center;

  @media (min-width: 480px) {
    margin-bottom: 10px;
  }

  @media (min-width: 768px) {
    margin-bottom: 12px;
  }

  img,
  svg {
    max-width: 100px;
    height: auto;

    @media (min-width: 480px) {
      max-width: 120px;
    }

    @media (min-width: 768px) {
      max-width: 140px;
    }
  }
`;

export const FormTitle = styled.h1`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 14px 0;
  text-align: center;

  @media (min-width: 480px) {
    font-size: 22px;
    margin: 0 0 18px 0;
  }

  @media (min-width: 768px) {
    font-size: 24px;
    margin: 0 0 20px 0;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
  width: 100%;

  @media (min-width: 480px) {
    margin-bottom: 12px;
  }

  @media (min-width: 768px) {
    margin-bottom: 16px;
  }
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;

  @media (min-width: 640px) {
    flex-direction: row;
    gap: 12px;
  }

  @media (min-width: 768px) {
    gap: 16px;
  }
`;

export const LoginLink = styled.div`
  margin-top: 12px;
  text-align: center;
  width: 100%;

  @media (min-width: 480px) {
    margin-top: 16px;
  }

  @media (min-width: 768px) {
    margin-top: 20px;
  }
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
  padding: 12px;
  background: #00bcd4;
  color: white;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  margin: 0;

  @media (min-width: 480px) {
    padding: 14px;
    font-size: 15.5px;
  }

  @media (min-width: 768px) {
    padding: 16px;
    font-size: 16px;
  }

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

export const DateInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const DateDisplayButton = styled.button<{ hasValue: boolean }>`
  width: 100%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: ${({ hasValue }) => (hasValue ? "#fff" : "rgba(255, 255, 255, 0.6)")};
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00bcd4;
    background: rgba(255, 255, 255, 0.15);
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const CalendarContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 8px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 16px;

  .rdp {
    margin: 0;
  }
`;
