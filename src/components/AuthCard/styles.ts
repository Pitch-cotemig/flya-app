import styled from "styled-components";

export const AuthCardContainer = styled.div`
  perspective: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
`;

export const AuthCardFlip = styled.div<{ flipped: boolean }>`
  width: 420px;
  max-width: 100vw;
  height: 600px;
  position: relative;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
  transform: ${({ flipped }) =>
    flipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

export const AuthCardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d1e4a;
  border-radius: 28px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  padding: 40px;
  box-sizing: border-box;
`;

export const AuthCardFront = styled(AuthCardFace)`
  z-index: 2;
`;

export const AuthCardBack = styled(AuthCardFace)`
  transform: rotateY(180deg);
  z-index: 1;
`;
