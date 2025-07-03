import styled from "styled-components";

export const HeroContainer = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("/images/4k-praia 1.png");
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(0, 188, 212, 0.1) 0%,
      transparent 50%,
      rgba(0, 188, 212, 0.1) 100%
    );
    animation: heroGradient 8s ease-in-out infinite;
  }

  @keyframes heroGradient {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.6;
    }
  }
`;

export const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 2rem;
  z-index: 2;
  position: relative;
`;

export const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  max-width: 800px;
  animation: heroTitleAnimation 1.5s ease-out;
  background: linear-gradient(45deg, #ffffff, #00bcd4);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @keyframes heroTitleAnimation {
    0% {
      opacity: 0;
      transform: translateY(-50px) scale(0.8);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  animation: heroSubtitleAnimation 1.5s ease-out 0.3s both;

  @keyframes heroSubtitleAnimation {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const HeroForm = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  animation: heroFormAnimation 1.5s ease-out 0.6s both;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  @keyframes heroFormAnimation {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const HeroInput = styled.input`
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 188, 212, 0.3);
    border-color: #00bcd4;
  }

  &::placeholder {
    color: #666;
  }
`;

export const HeroButton = styled.button`
  background: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
  position: relative;
  overflow: hidden;
  animation: pulseGlow 3s ease-in-out infinite;

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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    background: linear-gradient(135deg, #00acc1 0%, #0097a7 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 188, 212, 0.4);
    animation: none;

    &::before {
      left: 100%;
    }

    &::after {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  @keyframes pulseGlow {
    0%,
    100% {
      box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
    }
    50% {
      box-shadow: 0 8px 30px rgba(0, 188, 212, 0.6);
    }
  }
`;

export const FloatingParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 15%;
    left: 20%;
    width: 6px;
    height: 6px;
    background: rgba(0, 188, 212, 0.7);
    border-radius: 50%;
    animation: floatParticle1 10s ease-in-out infinite;
    box-shadow: 0 0 10px rgba(0, 188, 212, 0.5);
  }

  &::after {
    content: "";
    position: absolute;
    top: 70%;
    right: 25%;
    width: 4px;
    height: 4px;
    background: rgba(0, 188, 212, 0.5);
    border-radius: 50%;
    animation: floatParticle2 12s ease-in-out infinite;
    box-shadow: 0 0 8px rgba(0, 188, 212, 0.3);
  }

  @keyframes floatParticle1 {
    0%,
    100% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0.7;
    }
    25% {
      transform: translateY(-30px) translateX(20px) scale(1.3);
      opacity: 1;
    }
    50% {
      transform: translateY(-10px) translateX(-15px) scale(0.8);
      opacity: 0.5;
    }
    75% {
      transform: translateY(-40px) translateX(10px) scale(1.1);
      opacity: 0.8;
    }
  }

  @keyframes floatParticle2 {
    0%,
    100% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0.5;
    }
    33% {
      transform: translateY(-25px) translateX(-20px) scale(1.2);
      opacity: 0.8;
    }
    66% {
      transform: translateY(-45px) translateX(15px) scale(0.9);
      opacity: 0.6;
    }
  }
`;
