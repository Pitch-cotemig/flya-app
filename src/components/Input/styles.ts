import styled from "styled-components";

interface StyledInputProps {
  hasError?: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  color: #ffffff;
  background-color: transparent;
  border: 2px solid
    ${({ hasError }) => (hasError ? "#ff4d4f" : "rgba(255, 255, 255, 0.2)")};
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 12px 16px;
    font-size: 15px;
    border-radius: 10px;
  }

  @media (min-width: 768px) {
    padding: 14px 18px;
    font-size: 15.5px;
    border-radius: 11px;
  }

  @media (min-width: 1024px) {
    padding: 16px 20px;
    font-size: 16px;
    border-radius: 12px;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;

    @media (min-width: 480px) {
      font-size: 15px;
    }

    @media (min-width: 768px) {
      font-size: 16px;
    }
  }

  &:focus {
    border-color: ${({ hasError }) => (hasError ? "#ff4d4f" : "#00bcd4")};
    box-shadow: 0 0 0 2px
      ${({ hasError }) =>
        hasError ? "rgba(255, 77, 79, 0.2)" : "rgba(0, 188, 212, 0.2)"};
  }

  &:hover {
    border-color: ${({ hasError }) =>
      hasError ? "#ff4d4f" : "rgba(255, 255, 255, 0.4)"};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px transparent inset;
    -webkit-text-fill-color: #ffffff;
    transition: background-color 5000s ease-in-out 0s;
  }
`;
