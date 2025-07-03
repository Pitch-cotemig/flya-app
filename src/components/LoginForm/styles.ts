import styled from "styled-components";

export const LoginFormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const LogoContainer = styled.div`
  margin-bottom: 32px;
  text-align: center;
`;

export const FormTitle = styled.h1`
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 40px 0;
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
  width: 100%;
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

export const RegisterButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #00bcd4 0%, #0097a7 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #00acc1 0%, #00838f 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 188, 212, 0.3);
  }
`;
