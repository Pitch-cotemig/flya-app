import styled from "styled-components";
import { colors } from "../../design-tokens/colors";

export const SecurityContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SecurityCard = styled.div`
  background: ${colors.background.glassSoft};
  border-radius: 16px;
  border: 1px solid ${colors.border.white};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.border.whiteStrong};
    box-shadow: ${colors.shadow.lg};
  }
`;

export const SecurityCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid ${colors.border.white};
`;

export const SecurityCardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${colors.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.text.primary};
  box-shadow: ${colors.shadow.cyan};
`;

export const SecurityCardTitle = styled.h3`
  color: ${colors.text.primary};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;

export const SecurityCardDescription = styled.p`
  color: ${colors.text.primaryAlpha80};
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
`;

export const SecurityCardContent = styled.div`
  padding: 1.5rem;
`;

export const PasswordSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background: ${colors.background.glass};
  border-radius: 16px;
  border: 1px solid ${colors.border.white};
  margin-bottom: 1.5rem;
`;

export const PasswordFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const PasswordInputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: ${colors.text.primaryAlpha60};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  z-index: 1;

  &:hover {
    color: ${colors.text.primary};
    background: ${colors.background.glassStrong};
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const TwoFactorSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

export const TwoFactorStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  color: ${colors.text.primary};
`;

export const StatusIndicator = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ active }) =>
    active ? colors.state.success : colors.neutral.gray500};
  box-shadow: 0 0 0 2px
    ${({ active }) => (active ? colors.alpha.cyan02 : colors.alpha.white01)};
`;

export const ActionButton = styled.button<{ variant?: "primary" | "outline" }>`
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: ${({ variant }) =>
    variant === "outline" ? `1px solid ${colors.border.white}` : "none"};
  background: ${({ variant }) =>
    variant === "outline" ? "transparent" : colors.gradients.primary};
  color: ${colors.text.primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ variant }) =>
      variant === "outline"
        ? colors.background.glassStrong
        : colors.gradients.cyanHover};
    transform: translateY(-2px);
    box-shadow: ${({ variant }) =>
      variant === "outline" ? colors.shadow.lg : colors.shadow.cyan};
  }
`;

export const DangerZone = styled(SecurityCard)`
  border-color: ${colors.alpha.error02};
  background: linear-gradient(
    135deg,
    ${colors.alpha.error02},
    ${colors.background.glassSoft}
  );

  &:hover {
    border-color: ${colors.state.error};
  }
`;

export const DangerTitle = styled(SecurityCardTitle)`
  color: ${colors.state.error};
`;

export const DangerDescription = styled(SecurityCardDescription)`
  color: ${colors.text.primaryAlpha80};
`;

export const DangerButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: 1px solid ${colors.state.error};
  background: transparent;
  color: ${colors.state.error};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.state.error};
    color: ${colors.text.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${colors.alpha.error04};
  }
`;
