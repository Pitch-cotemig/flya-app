import React from "react";
import styled from "styled-components";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { colors } from "../../design-tokens/colors";

interface FeedbackMessageProps {
  type: "success" | "error" | "loading";
  message: string;
  onClose?: () => void;
}

const MessageContainer = styled.div<{ type: "success" | "error" | "loading" }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  margin: 1rem 0;
  font-size: 0.875rem;
  font-weight: 500;

  background: ${({ type }) => {
    switch (type) {
      case "success":
        return `linear-gradient(135deg, ${colors.alpha.cyan01}, ${colors.background.glassSoft})`;
      case "error":
        return `linear-gradient(135deg, ${colors.alpha.error02}, ${colors.background.glassSoft})`;
      case "loading":
        return colors.background.glass;
      default:
        return colors.background.glassSoft;
    }
  }};

  border: 1px solid
    ${({ type }) => {
      switch (type) {
        case "success":
          return colors.state.success;
        case "error":
          return colors.state.error;
        case "loading":
          return colors.border.white;
        default:
          return colors.border.white;
      }
    }};

  color: ${({ type }) => {
    switch (type) {
      case "success":
        return colors.text.primary;
      case "error":
        return colors.text.primary;
      case "loading":
        return colors.text.primaryAlpha80;
      default:
        return colors.text.primary;
    }
  }};
`;

const IconWrapper = styled.div<{ type: "success" | "error" | "loading" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ type }) => {
    switch (type) {
      case "success":
        return colors.state.success;
      case "error":
        return colors.state.error;
      case "loading":
        return colors.primary.cyan;
      default:
        return colors.text.primaryAlpha60;
    }
  }};

  ${({ type }) =>
    type === "loading" &&
    `
    animation: spin 1s linear infinite;
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `}
`;

const MessageText = styled.span`
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.text.primaryAlpha60};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${colors.text.primary};
    background: ${colors.background.glassStrong};
  }
`;

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({
  type,
  message,
  onClose,
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} />;
      case "error":
        return <XCircle size={20} />;
      case "loading":
        return <Loader size={20} />;
      default:
        return null;
    }
  };

  return (
    <MessageContainer type={type}>
      <IconWrapper type={type}>{getIcon()}</IconWrapper>
      <MessageText>{message}</MessageText>
      {onClose && type !== "loading" && (
        <CloseButton onClick={onClose}>
          <XCircle size={16} />
        </CloseButton>
      )}
    </MessageContainer>
  );
};

export default FeedbackMessage;
