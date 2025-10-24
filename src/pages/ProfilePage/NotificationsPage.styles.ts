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

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${colors.text.primary};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
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
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${({ enabled }) => enabled ? colors.gradients.primary : colors.background.glass};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ enabled }) => enabled ? colors.text.primary : colors.text.primaryAlpha60};
  transition: all 0.3s ease;
`;

export const NotificationInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const NotificationTitle = styled.h3`
  color: ${colors.text.primary};
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

export const NotificationDescription = styled.p`
  color: ${colors.text.primaryAlpha80};
  font-size: 0.875rem;
  margin: 0;
`;

export const NotificationToggle = styled.div`
  display: flex;
  align-items: center;
`;

export const ToggleSwitch = styled.button<{ enabled: boolean }>`
  width: 48px;
  height: 24px;
  border-radius: 12px;
  border: none;
  background: ${({ enabled }) => enabled ? colors.primary.cyan : colors.neutral.gray500};
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: ${({ enabled }) => enabled ? colors.primary.cyanHover : colors.neutral.gray400};
  }
`;

export const ToggleSlider = styled.div<{ enabled: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  position: absolute;
  top: 2px;
  left: ${({ enabled }) => enabled ? '26px' : '2px'};
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const NotificationFrequency = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${colors.border.white};
`;

export const FrequencyLabel = styled.label`
  color: ${colors.text.primary};
  font-weight: 500;
  font-size: 0.875rem;
`;

export const FrequencySelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${colors.border.white};
  border-radius: 8px;
  background: ${colors.background.glass};
  color: ${colors.text.primary};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary.cyan};
    box-shadow: 0 0 0 3px ${colors.alpha.cyan02};
  }
`;

export const SaveButton = styled.button`
  padding: 1rem 2rem;
  background: ${colors.gradients.primary};
  color: ${colors.text.primary};
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover {
    background: ${colors.gradients.cyanHover};
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.cyan};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;