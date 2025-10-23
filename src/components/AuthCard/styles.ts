import styled from "styled-components";

export const AuthCardContainer = styled.div`
  perspective: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120vh;
  background: #1c1c43;
  padding: 1.5rem 1rem;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const AuthCardFlip = styled.div<{ flipped: boolean }>`
  width: 100%;
  max-width: 100%;
  position: relative;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
  transform: ${({ flipped }) =>
    flipped ? "rotateY(180deg)" : "rotateY(0deg)"};
  min-height: 500px;

  @media (min-width: 480px) {
    max-width: 440px;
  }

  /* Garante que o container expanda com o conteúdo */
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

export const AuthCardFace = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  min-height: 500px;
  backface-visibility: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: #0d1e4a;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  padding: 24px 16px;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 28px 20px;
    border-radius: 20px;
  }

  @media (min-width: 768px) {
    padding: 32px 24px;
    border-radius: 28px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

export const AuthCardFront = styled(AuthCardFace)``;

export const AuthCardBack = styled(AuthCardFace)`
  transform: rotateY(180deg);
`;
