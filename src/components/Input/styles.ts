import styled from "styled-components";

interface StyledInputProps {
  hasError?: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  padding: 16px 20px;
  font-size: 16px;
  color: #ffffff;
  background-color: transparent;
  border: 2px solid
    ${({ hasError }) => (hasError ? "#ff4d4f" : "rgba(255, 255, 255, 0.2)")};
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-size: 16px;
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

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
`;
