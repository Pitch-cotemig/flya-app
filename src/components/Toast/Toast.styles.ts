import styled, { keyframes } from "styled-components";
import { colors } from "../../design-tokens";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const ToastContainer = styled.div<{
  type: "success" | "error" | "info";
}>`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
  min-width: 300px;
  max-width: 500px;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(20px);
  border: 1px solid ${colors.alpha.white02};
  animation: ${slideIn} 0.3s ease-out forwards;

  background: ${(props) => {
    switch (props.type) {
      case "success":
        return `linear-gradient(135deg, 
          rgba(34, 197, 94, 0.1) 0%, 
          rgba(34, 197, 94, 0.05) 100%)`;
      case "error":
        return `linear-gradient(135deg, 
          ${colors.alpha.error04} 0%, 
          ${colors.alpha.error02} 100%)`;
      case "info":
        return `linear-gradient(135deg, 
          ${colors.alpha.cyan03} 0%, 
          ${colors.alpha.cyan01} 100%)`;
      default:
        return colors.background.glass;
    }
  }};

  box-shadow: ${(props) => {
    switch (props.type) {
      case "success":
        return "0 8px 32px rgba(34, 197, 94, 0.2)";
      case "error":
        return colors.shadow.error;
      case "info":
        return colors.shadow.cyan;
      default:
        return colors.shadow.card;
    }
  }};

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    min-width: auto;
    max-width: none;
  }
`;

export const ToastContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ToastIcon = styled.div<{ type: "success" | "error" | "info" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  color: ${(props) => {
    switch (props.type) {
      case "success":
        return colors.state.success;
      case "error":
        return colors.state.error;
      case "info":
        return colors.primary.cyan;
      default:
        return colors.text.primary;
    }
  }};
`;

export const ToastMessage = styled.span`
  flex: 1;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${colors.text.primary};
  line-height: 1.4;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${colors.text.secondary};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: ${colors.alpha.white02};
    color: ${colors.text.primary};
  }

  &:active {
    transform: scale(0.95);
  }
`;
