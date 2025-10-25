import styled, { keyframes } from "styled-components";
import { colors } from "../../design-tokens/colors";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const heartBeat = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

interface CardProps {
  isFavorite?: boolean;
}

interface FavoriteButtonProps {
  isFavorite?: boolean;
}

export const Card = styled.div<CardProps>`
  background: ${colors.background.primaryAlpha};
  backdrop-filter: blur(12px);
  color: ${colors.text.primary};
  border-radius: 16px;
  padding: 24px;
  box-shadow: ${colors.shadow.card};
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid ${colors.alpha.white01};
  overflow: hidden;
  animation: ${slideUp} 0.5s ease-out;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${colors.gradients.primary};
    opacity: ${(props) => (props.isFavorite ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${colors.shadow.cardHover};
    border-color: ${colors.alpha.cyan03};

    &::before {
      opacity: 1;
    }
  }
`;

export const CardHeader = styled.div`
  margin-bottom: 16px;
`;

export const TripTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  background: ${colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const TripDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

export const DetailItem = styled.span`
  font-size: 0.875rem;
  color: ${colors.text.muted};
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;

  .icon {
    font-size: 1rem;
    color: ${colors.primary.cyan};
  }
`;

export const TripSummary = styled.p`
  font-size: 0.875rem;
  color: ${colors.text.primaryAlpha80};
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid ${colors.alpha.white01};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const ViewDetailsButton = styled.button`
  background: ${colors.gradients.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.cyan};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const IconButton = styled.button<{ variant?: "danger" | "favorite" }>`
  background: ${(props) =>
    props.variant === "danger"
      ? colors.alpha.error02
      : props.variant === "favorite"
      ? colors.background.glassStrong
      : colors.background.glass};
  color: ${(props) =>
    props.variant === "danger"
      ? colors.state.error
      : props.variant === "favorite"
      ? colors.state.warning
      : colors.text.muted};
  border: 1px solid
    ${(props) =>
      props.variant === "danger"
        ? colors.alpha.error02
        : props.variant === "favorite"
        ? colors.alpha.white02
        : colors.alpha.white01};
  backdrop-filter: blur(8px);
  border-radius: 8px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    background: ${(props) =>
      props.variant === "danger"
        ? colors.alpha.error04
        : props.variant === "favorite"
        ? colors.background.glassStrong
        : colors.background.glassStrong};
    border-color: ${(props) =>
      props.variant === "danger"
        ? colors.alpha.error04
        : props.variant === "favorite"
        ? colors.alpha.cyan02
        : colors.alpha.cyan02};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FavoriteButton = styled(IconButton)<FavoriteButtonProps>`
  background: ${(props) =>
    props.isFavorite ? colors.background.glassStrong : colors.background.glass};
  color: ${(props) =>
    props.isFavorite ? colors.state.warning : colors.text.muted};
  border-color: ${(props) =>
    props.isFavorite ? colors.alpha.cyan02 : colors.alpha.white01};
  animation: ${(props) => (props.isFavorite ? heartBeat : "none")} 0.6s ease;

  &:hover {
    background: ${colors.background.glassStrong};
    color: ${(props) =>
      props.isFavorite ? colors.state.warning : colors.primary.cyan};
    border-color: ${colors.alpha.cyan03};
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.background.overlay};
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background: ${colors.background.primaryAlpha};
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 32px;
  max-width: 800px;
  overflow-y: auto;
  width: 100%;
  position: relative;
  box-shadow: ${colors.shadow.modal};
  color: ${colors.text.primary};
  border: 1px solid ${colors.alpha.white01};
  animation: ${slideUp} 0.3s ease-out;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${colors.alpha.white01};
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  background: ${colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const CloseButton = styled.button`
  background: ${colors.background.glass};
  border: 1px solid ${colors.alpha.white01};
  color: ${colors.text.muted};
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.background.glassStrong};
    color: ${colors.text.primary};
    border-color: ${colors.alpha.cyan02};
  }
`;

export const ModalBody = styled.div`
  margin-bottom: 24px;
`;

export const PlanContent = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.7;
  color: ${colors.text.muted};
  background: ${colors.background.glassSoft};
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid ${colors.primary.cyan};
  font-size: 0.875rem;
  max-height: 500px;
  overflow-y: auto;

  /* Estilo customizado do scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.background.glass};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(
      135deg,
      ${colors.primary.cyan} 0%,
      ${colors.primary.blue} 100%
    );
    border-radius: 10px;
    transition: background 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(
      135deg,
      ${colors.primary.blue} 0%,
      ${colors.primary.cyan} 100%
    );
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: ${colors.primary.cyan} ${colors.background.glass};
`;

export const ExportButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const ExportButton = styled.button`
  padding: 10px 20px;
  border: 2px solid ${colors.primary.cyan};
  background: transparent;
  color: ${colors.primary.cyan};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.primary.cyan};
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ConfirmModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.background.overlay};
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 20px;
`;

export const ConfirmContent = styled.div`
  background: ${colors.background.primaryAlpha};
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  width: 100%;
  border: 1px solid ${colors.alpha.white01};
  box-shadow: ${colors.shadow.modal};
  color: ${colors.text.primary};
  text-align: center;
  animation: ${slideUp} 0.3s ease-out;
`;

export const ConfirmTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: ${colors.state.error};
`;

export const ConfirmMessage = styled.p`
  font-size: 1rem;
  color: ${colors.text.muted};
  margin-bottom: 24px;
  line-height: 1.5;
`;

export const ConfirmActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const ConfirmButton = styled.button<{ variant?: "danger" | "cancel" }>`
  padding: 10px 20px;
  border: 2px solid
    ${(props) =>
      props.variant === "danger" ? colors.state.error : colors.alpha.white01};
  background: ${(props) =>
    props.variant === "danger" ? colors.state.error : "transparent"};
  color: ${(props) =>
    props.variant === "danger" ? "white" : colors.text.muted};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;

  &:hover {
    transform: translateY(-2px);
    background: ${(props) =>
      props.variant === "danger"
        ? colors.state.errorDark
        : colors.background.glassStrong};
    border-color: ${(props) =>
      props.variant === "danger"
        ? colors.state.errorDark
        : colors.alpha.cyan02};
    color: ${(props) =>
      props.variant === "danger" ? "white" : colors.text.primary};
  }

  &:active {
    transform: translateY(0);
  }
`;
