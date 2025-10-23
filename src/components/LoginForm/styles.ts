import styled from "styled-components";

export const LoginFormContainer = styled.form`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: fit-content;
  box-sizing: border-box;
`;

export const LogoContainer = styled.div`
  margin-bottom: 12px;
  text-align: center;

  @media (min-width: 640px) {
    margin-bottom: 16px;
  }

  @media (min-width: 768px) {
    margin-bottom: 20px;
  }

  img,
  svg {
    max-width: 120px;
    height: auto;

    @media (min-width: 640px) {
      max-width: 140px;
    }

    @media (min-width: 768px) {
      max-width: 160px;
    }
  }
`;

export const FormTitle = styled.h1`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 16px 0;
  text-align: center;

  @media (min-width: 640px) {
    font-size: 24px;
    margin: 0 0 20px 0;
  }

  @media (min-width: 768px) {
    font-size: 28px;
    margin: 0 0 24px 0;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 12px;
  width: 100%;

  @media (min-width: 640px) {
    margin-bottom: 16px;
  }

  @media (min-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const LoginLink = styled.div`
  margin-top: 16px;
  text-align: center;
  width: 100%;

  @media (min-width: 640px) {
    margin-top: 20px;
  }

  @media (min-width: 768px) {
    margin-top: 24px;
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

  @media (min-width: 640px) {
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
