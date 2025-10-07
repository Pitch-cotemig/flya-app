import styled from "styled-components";
import { colors } from "../../design-tokens/colors";

export const Container = styled.div`
  min-height: calc(100vh - 140px); /* Ajuste para Header e Footer */
  background: ${colors.background.primary};
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
`;

export const Sidebar = styled.aside`
  width: 280px;
  background: ${colors.background.glass};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 1.5rem;
  height: fit-content;
  box-shadow: ${colors.shadow.card};
  border: 1px solid ${colors.border.white};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SidebarItem = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border: none;
  border-radius: 16px;
  background: ${({ active }) =>
    active ? colors.gradients.primary : "transparent"};
  color: ${({ active }) =>
    active ? colors.text.primary : colors.text.primaryAlpha80};
  font-weight: ${({ active }) => (active ? "600" : "500")};
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
  border: 1px solid
    ${({ active }) => (active ? "transparent" : colors.border.white)};

  &:hover {
    background: ${({ active }) =>
      active ? colors.gradients.primary : colors.background.glassStrong};
    border-color: ${({ active }) =>
      active ? "transparent" : colors.border.whiteStrong};
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.lg};
  }

  &.logout {
    margin-top: 1rem;
    color: ${colors.state.error};
    border-color: ${colors.alpha.error02};

    &:hover {
      background: ${colors.alpha.error02};
      border-color: ${colors.state.error};
      color: ${colors.text.primary};
    }
  }

  svg {
    flex-shrink: 0;
  }
`;

export const ContentArea = styled.div`
  flex: 1;
  background: ${colors.background.glass};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: ${colors.shadow.card};
  border: 1px solid ${colors.border.white};
  overflow: hidden;
`;

export const ProfileHeader = styled.div`
  padding: 2rem 2rem 1.5rem;
  border-bottom: 1px solid ${colors.border.white};
  background: linear-gradient(
    135deg,
    ${colors.alpha.cyan01},
    ${colors.alpha.purple01}
  );

  h1 {
    color: ${colors.text.primary};
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const ProfileForm = styled.form`
  padding: 2rem;
`;

export const FormSection = styled.div`
  margin-bottom: 2rem;
`;

export const PhotoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: ${colors.background.glassSoft};
  border-radius: 16px;
  border: 1px solid ${colors.border.white};

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    padding: 1.5rem;
  }
`;

export const PhotoPreview = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${colors.background.glassStrong};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 3px solid ${colors.border.primary};
  box-shadow: ${colors.shadow.cyan};
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    color: ${colors.text.primaryAlpha60};
  }

  &::after {
    content: "";
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: ${colors.gradients.primary};
    z-index: -1;
    opacity: 0.3;
  }
`;

export const PhotoActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const PhotoButton = styled.button<{ variant?: "outline" }>`
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: ${({ variant }) =>
    variant === "outline" ? `1px solid ${colors.border.white}` : "none"};
  background: ${({ variant }) =>
    variant === "outline" ? "transparent" : colors.gradients.primary};
  color: ${colors.text.primary};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${({ variant }) =>
      variant === "outline"
        ? colors.background.glassStrong
        : colors.gradients.cyanHover};
    transform: translateY(-2px);
    box-shadow: ${({ variant }) =>
      variant === "outline" ? colors.shadow.lg : colors.shadow.cyan};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  color: ${colors.text.primary};
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
`;

export const Input = styled.input`
  padding: 1rem 1.25rem;
  border: 2px solid ${colors.border.white};
  border-radius: 12px;
  background: ${colors.background.glassSoft};
  backdrop-filter: blur(10px);
  color: ${colors.text.primary};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary.cyan};
    box-shadow: 0 0 0 3px ${colors.alpha.cyan02};
    background: ${colors.background.glass};
  }

  &:hover {
    border-color: ${colors.border.whiteStrong};
  }

  &::placeholder {
    color: ${colors.text.primaryAlpha60};
  }

  &[type="date"] {
    color-scheme: dark;
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
  margin-top: 1.5rem;
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
