import styled from "styled-components";
import { colors } from "../../design-tokens/colors";

export const NotificationsContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const NotificationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${colors.text.primary};
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const SectionDescription = styled.p`
  color: ${colors.text.primaryAlpha80};
  font-size: 0.875rem;
  margin: 0 0 1rem;
`;

export const NotificationCard = styled.div`
  background: ${colors.background.glassSoft};
  border-radius: 16px;
  border: 1px solid ${colors.border.white};
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.border.whiteStrong};
    box-shadow: ${colors.shadow.lg};
  }
`;

export const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NotificationIcon = styled.div<{ enabled: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ enabled }) =>
    enabled ? colors.gradients.primary : colors.background.glassStrong};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ enabled }) =>
    enabled ? colors.text.primary : colors.text.primaryAlpha60};
  transition: all 0.3s ease;
  box-shadow: ${({ enabled }) => (enabled ? colors.shadow.cyan : "none")};
`;

export const NotificationInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const NotificationTitle = styled.h4`
  color: ${colors.text.primary};
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

export const NotificationDescription = styled.p`
  color: ${colors.text.primaryAlpha80};
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.4;
`;

export const NotificationToggle = styled.div`
  display: flex;
  align-items: center;
`;

export const ToggleSwitch = styled.button<{ enabled: boolean }>`
  width: 50px;
  height: 28px;
  border-radius: 14px;
  border: none;
  background: ${({ enabled }) =>
    enabled ? colors.gradients.primary : colors.neutral.gray600};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: ${({ enabled }) =>
    enabled ? colors.shadow.cyan : colors.shadow.sm};

  &:hover {
    transform: scale(1.05);
  }
`;

export const ToggleSlider = styled.div<{ enabled: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${colors.text.primary};
  position: absolute;
  top: 3px;
  left: ${({ enabled }) => (enabled ? "25px" : "3px")};
  transition: all 0.3s ease;
  box-shadow: ${colors.shadow.sm};
`;

export const NotificationFrequency = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${colors.border.white};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const FrequencyLabel = styled.label`
  color: ${colors.text.primary};
  font-weight: 500;
  font-size: 0.875rem;
`;

export const FrequencySelect = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${colors.border.white};
  border-radius: 8px;
  background: ${colors.background.glass};
  color: ${colors.text.primary};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary.cyan};
    box-shadow: 0 0 0 2px ${colors.alpha.cyan02};
  }

  &:hover {
    border-color: ${colors.border.whiteStrong};
  }

  option {
    background: ${colors.background.primary};
    color: ${colors.text.primary};
  }
`;

export const SaveButton = styled.button`
  background: ${colors.gradients.primary};
  color: ${colors.text.primary};
  border: none;
  border-radius: 12px;
  padding: 1rem 2.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${colors.shadow.cyan};
  align-self: flex-start;

  &:hover {
    background: ${colors.gradients.cyanHover};
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.cyanStrong};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
