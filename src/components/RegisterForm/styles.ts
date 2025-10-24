import styled from "styled-components";

export const RegisterFormContainer = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
`;

export const LogoContainer = styled.div`
  margin-bottom: 12px;
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
  margin-bottom: 24px;
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

export const BackButton = styled.button`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.06);
  color: #00bcd4;
  border: 1px solid rgba(0, 188, 212, 0.22);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 12px;
  transition: all 0.18s ease;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 188, 212, 0.08);
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 188, 212, 0.12);
  }

  &:active {
    transform: translateY(0);
  }
`;
