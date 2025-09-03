import styled, { keyframes } from "styled-components";
import { colors } from "../../../design-tokens/colors";

// Animations
export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const subtleFloat = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-2px);
  }
`;

export const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
`;

export const ExportButton = styled.button`
  padding: 12px 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
  min-width: 120px;
  justify-content: center;

  &:hover {
    background: rgba(0, 188, 212, 0.1);
    color: #00bcd4;
    border-color: rgba(0, 188, 212, 0.3);
    transform: translateY(-2px);
  }
`;

export const FinalScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  color: ${colors.text.primary};
  padding: 0;
  margin: 0;
  background: rgba(13, 16, 32, 0.95);
`;

export const HeaderSection = styled.div`
  padding: 3rem 2rem 1rem 2rem;
  text-align: center;
  animation: ${fadeInUp} 0.8s ease-out;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem 0.5rem 1.5rem;
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 300;
    margin: 0 0 1rem 0;
    color: rgba(255, 255, 255, 0.95);
    letter-spacing: -0.5px;
    line-height: 1.2;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
      color: ${colors.primary.cyan};
      transform: translateY(-2px);
    }

    &:hover::after {
      content: " ✏️";
      font-size: 1.5rem;
      opacity: 0.7;
    }

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
    font-weight: 300;
    line-height: 1.5;
    max-width: 600px;
    margin: 0 auto;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

export const RoteiroContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const SummaryBlock = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 2.5rem;
  margin: 3rem 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeInUp} 0.8s ease-out;

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 2rem 0;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.95);
    margin: 0 0 2rem 0;
    text-align: center;

    &::before {
      content: "📋";
      display: block;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 1rem;
  }

  li {
    font-size: 1rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 300;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border-left: 3px solid ${colors.primary.cyan};
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      transform: translateX(5px);
    }

    &::before {
      content: "✨";
      margin-right: 10px;
      font-size: 0.9rem;
    }

    strong {
      font-weight: 600;
      color: rgba(255, 255, 255, 0.95);
    }
  }
`;

export const DayBlock = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeInUp} 0.8s ease-out;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 2rem;
    margin-bottom: 1.5rem;
  }

  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.03);
  }
`;

export const DayTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 2rem 0;
  text-align: center;

  &::before {
    content: "📅";
    display: block;
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }
`;

export const PeriodSection = styled.div`
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const PeriodTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 1.5rem 0;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: ${colors.primary.cyan};
    border-radius: 50%;
  }
`;

export const RoteiroItem = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    transform: translateX(5px);
  }
`;

export const ItemContent = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
  flex: 1;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  position: relative;

  &::before {
    content: "•";
    color: ${colors.primary.cyan};
    font-weight: bold;
    margin-right: 12px;
    font-size: 1.2rem;
  }

  strong {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
  }
`;

export const ItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  flex-shrink: 0;

  ${RoteiroItem}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    opacity: 1;
    justify-content: flex-end;
    width: 100%;
  }
`;

export const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 400;
  font-size: 0.85rem;
  backdrop-filter: blur(10px);
  min-width: 50px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
  }

  &:first-child {
    background: rgba(0, 188, 212, 0.1);
    border-color: rgba(0, 188, 212, 0.2);
    color: #00bcd4;

    &:hover {
      background: rgba(0, 188, 212, 0.2);
      border-color: #00bcd4;
    }
  }

  &:last-child {
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.2);
    color: #ef4444;

    &:hover {
      background: rgba(239, 68, 68, 0.2);
      border-color: #ef4444;
    }
  }
`;

// Modal de Edição
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 1000;
  animation: ${fadeInUp} 0.3s ease-out;
  overflow-y: auto;
`;

export const ModalContainer = styled.div`
  background: rgba(13, 16, 32, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: calc(100% - 4rem);
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  position: absolute;
  animation: ${fadeInUp} 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem;
    max-width: none;
    max-height: 90vh;
    width: calc(100% - 2rem);
    left: 1rem !important;
    top: 1rem !important;
  }
`;

export const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h3 {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.95);
    margin: 0 0 0.5rem 0;
    font-weight: 400;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
    font-size: 0.9rem;
  }
`;

export const EditTextarea = styled.textarea<{ isTitle?: boolean }>`
  width: 100%;
  min-height: ${(props) => (props.isTitle ? "80px" : "200px")};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: ${(props) => (props.isTitle ? "1.2rem" : "1rem")};
  font-family: inherit;
  font-weight: ${(props) => (props.isTitle ? "500" : "400")};
  line-height: 1.6;
  resize: vertical;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  text-align: ${(props) => (props.isTitle ? "center" : "left")};

  &:focus {
    outline: none;
    border-color: ${colors.primary.cyan};
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const ModalButton = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.75rem 1.5rem;
  border: 1px solid
    ${(props) =>
      props.variant === "primary"
        ? "rgba(0, 188, 212, 0.3)"
        : "rgba(255, 255, 255, 0.2)"};
  background: ${(props) =>
    props.variant === "primary"
      ? "rgba(0, 188, 212, 0.1)"
      : "rgba(255, 255, 255, 0.05)"};
  color: ${(props) =>
    props.variant === "primary" ? "#00bcd4" : "rgba(255, 255, 255, 0.8)"};
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  min-width: 100px;

  &:hover {
    background: ${(props) =>
      props.variant === "primary"
        ? "rgba(0, 188, 212, 0.2)"
        : "rgba(255, 255, 255, 0.1)"};
    border-color: ${(props) =>
      props.variant === "primary" ? "#00bcd4" : "rgba(255, 255, 255, 0.3)"};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FooterActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 3rem 2rem;
  animation: ${fadeInUp} 1s ease-out;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    gap: 0.75rem;
  }
`;

export const ErrorContainer = styled.div`
  text-align: center;
  padding: 60px 32px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.15);

  h3 {
    font-size: 1.25rem;
    margin-bottom: 16px;
    font-weight: 600;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 24px;
    line-height: 1.6;
  }

  .error-icon {
    font-size: 3rem;
    margin-bottom: 20px;
    display: block;
    opacity: 0.7;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 100px 32px;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  animation: ${subtleFloat} 3s ease-in-out infinite;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 16px;
    color: rgba(255, 255, 255, 0.95);
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    max-width: 400px;
    margin: 0 auto 24px;
    color: rgba(255, 255, 255, 0.7);
  }

  .emoji {
    font-size: 3rem;
    margin-bottom: 24px;
    display: block;
  }
`;
