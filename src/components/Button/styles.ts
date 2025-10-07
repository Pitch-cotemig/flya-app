import styled from "styled-components";
import { colors } from "../../design-tokens/colors";

export const StyledButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.text.primary};
  background: ${colors.gradients.primary};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${colors.shadow.cyan};

  &:hover {
    background: ${colors.gradients.cyanHover};
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.cyanStrong};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${colors.neutral.gray600};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
