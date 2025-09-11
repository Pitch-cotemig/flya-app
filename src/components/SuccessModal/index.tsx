import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(15, 23, 42, 0.8) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  backdrop-filter: blur(10px) saturate(120%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`

  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3rem 2.5rem;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 188, 212, 0.2), 0 8px 25px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-align: center;
  max-width: 450px;
  width: 90%;
  position: relative;
  animation: ${slideUp} 0.5s ease-out;
  color: white;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #00bcd4 0%, #00acc1 50%, #00bcd4 100%);
    background-size: 200% 100%;
    animation: ${shimmer} 2s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;

    animation: ${shimmer} 4s ease-in-out infinite;
    pointer-events: none;
  }
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
  font-size: 2.5rem;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 188, 212, 0.4), 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;

  &::before {
    content: "✓";
    animation: ${fadeIn} 0.6s ease-out 0.2s both;
  }
`;

const ModalTitle = styled.h2`
  color: white;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #e0f7ff 50%, #00bcd4 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  position: relative;
  z-index: 2;
  line-height: 1.3;
`;

const ModalButton = styled.button`
  background: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 20px rgba(0, 188, 212, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 120px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #00acc1 0%, #0097a7 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0, 188, 212, 0.6), 0 4px 15px rgba(0, 0, 0, 0.2);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }
`;

interface SuccessModalProps {
  title: string;
  onConfirm: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ title, onConfirm }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <SuccessIcon />
        <ModalTitle>{title}</ModalTitle>
        <ModalButton onClick={onConfirm}>Continuar</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SuccessModal;
