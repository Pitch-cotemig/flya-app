import styled from "styled-components";

export const AuthCardContainer = styled.div`
  perspective: 1200px;
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: #1c1c43;
  padding: 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const AuthCardFlip = styled.div<{ flipped: boolean }>`
  width: 100%;
  max-width: 900px;
  position: relative;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
  transform: ${({ flipped }) =>
    flipped ? "rotateY(180deg)" : "rotateY(0deg)"};

  @media (max-width: 1024px) {
    max-width: 700px;
  }

  @media (max-width: 768px) {
    max-width: 500px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

export const AuthCardFace = styled.div`
  position: absolute;
  width: 100%;
  max-height: 90vh;
  height: fit-content;
  top: 50%;
  translate: 0 -50%;
  left: 0;
  backface-visibility: hidden;
  display: grid;
  place-items: center;
  background: #0d1e4a;
  border-radius: 28px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 188, 212, 0.5);
    border-radius: 10px;

    &:hover {
      background: rgba(0, 188, 212, 0.7);
    }
  }

  @media (max-width: 768px) {
    border-radius: 20px;
    padding: 16px;
    max-height: 95vh;
  }

  @media (max-width: 480px) {
    border-radius: 16px;
    padding: 12px;
  }
`;

export const AuthCardFront = styled(AuthCardFace)``;

export const AuthCardBack = styled(AuthCardFace)`
  transform: rotateY(180deg);
`;
