import styled from "styled-components";

interface HeroContainerProps {
  imageLoaded?: boolean;
}

export const HeroContainer = styled.section<HeroContainerProps>`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(
      135deg,
      rgba(15, 23, 42, 0.7) 0%,
      rgba(0, 0, 0, 0.4) 30%,
      rgba(0, 188, 212, 0.1) 50%,
      rgba(0, 0, 0, 0.5) 70%,
      rgba(28, 28, 67, 0.8) 100%
    ),
    ${(props) =>
      props.imageLoaded
        ? `url("/images/mungyu-kim-Ex57cKpwdnE-unsplash.jpg")`
        : "linear-gradient(135deg, #0f172a 0%, #00bcd4 100%)"};
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  color: white;
  text-align: center;
  overflow: hidden;

  /* Transição suave quando a imagem carrega */
  transition: background-image 0.8s ease-in-out;
  will-change: background-image;

  /* Fallback enquanto carrega */
  background-color: #0f172a;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        ellipse at 30% 70%,
        rgba(0, 188, 212, 0.15) 0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse at 70% 30%,
        rgba(124, 58, 237, 0.1) 0%,
        transparent 50%
      );
    animation: heroGradient 15s ease-in-out infinite;
  }

  @keyframes heroGradient {
    0%,
    100% {
      opacity: 0.6;
      transform: scale(1) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1.05) rotate(1deg);
    }
  }

  @media (max-width: 768px) {
    background-attachment: scroll;
  }

  /* Preload hint para a imagem */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    background-image: url("/images/mungyu-kim-Ex57cKpwdnE-unsplash.jpg");
    opacity: 0;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 2rem;
  z-index: 2;
  position: relative;
  /* Removido margin-top pois agora o MainLayout não adiciona padding-top na home */
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  max-width: 900px;
  line-height: 1.2;
  animation: heroTitleAnimation 1.5s ease-out;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #e0f7ff 25%,
    #00bcd4 50%,
    #ffffff 75%
  );
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: heroTitleAnimation 1.5s ease-out,
    shimmerText 3s ease-in-out infinite;

  @keyframes heroTitleAnimation {
    0% {
      opacity: 0;
      transform: translateY(-30px) scale(0.9);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes shimmerText {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @media (max-width: 768px) {
    font-size: clamp(2rem, 8vw, 3rem);
    margin-bottom: 2rem;
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
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 188, 212, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 2.5rem;
  width: 100%;
  max-width: 550px;
  margin: 0 auto 4rem auto;
  animation: heroFormAnimation 1.5s ease-out 0.6s both;

  @keyframes heroFormAnimation {
    0% {
      opacity: 0;
      transform: translateY(40px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
    margin: 0 auto 2rem auto;
    gap: 1.2rem;
  }
`;

export const HeroInput = styled.input`
  padding: 1.2rem 1.8rem;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  outline: none;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  font-family: inherit;

  &:focus {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 188, 212, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    border-color: #00bcd4;
    background: rgba(255, 255, 255, 0.98);
  }

  &::placeholder {
    color: #666;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
`;

export const HeroButton = styled.button`
  background: linear-gradient(135deg, #00bcd4 0%, #00acc1 50%, #0097a7 100%);
  color: white;
  padding: 1.2rem 3rem;
  border: none;
  border-radius: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 15px rgba(0, 188, 212, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  animation: pulseGlow 4s ease-in-out infinite;
  font-family: inherit;
  text-transform: uppercase;
  letter-spacing: 0.5px;

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

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #00acc1 0%, #0097a7 50%, #006064 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    background: linear-gradient(135deg, #00acc1 0%, #0097a7 50%, #006064 100%);
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 188, 212, 0.5), 0 4px 15px rgba(0, 0, 0, 0.2);
    animation: none;

    &::before {
      left: 100%;
    }

    &::after {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-2px);
  }

  @keyframes pulseGlow {
    0%,
    100% {
      box-shadow: 0 4px 15px rgba(0, 188, 212, 0.4),
        0 2px 8px rgba(0, 0, 0, 0.1);
    }
    50% {
      box-shadow: 0 8px 30px rgba(0, 188, 212, 0.6),
        0 4px 15px rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: 768px) {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
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
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 20%;
    left: 15%;
    width: 8px;
    height: 8px;
    background: rgba(0, 188, 212, 0.8);
    border-radius: 50%;
    animation: floatParticle1 15s ease-in-out infinite;
    box-shadow: 0 0 20px rgba(0, 188, 212, 0.6), 0 0 40px rgba(0, 188, 212, 0.3);
  }

  &::after {
    content: "";
    position: absolute;
    top: 65%;
    right: 20%;
    width: 6px;
    height: 6px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    animation: floatParticle2 18s ease-in-out infinite;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5),
      0 0 30px rgba(255, 255, 255, 0.2);
  }

  /* Additional floating elements */
  /* Particle 3 */
  &:after {
    content: "";
    position: absolute;
    top: 40%;
    left: 80%;
    width: 4px;
    height: 4px;
    background: rgba(0, 188, 212, 0.6);
    border-radius: 50%;
    animation: floatParticle3 12s ease-in-out infinite;
    box-shadow: 0 0 10px rgba(0, 188, 212, 0.4);
  }

  @keyframes floatParticle1 {
    0%,
    100% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0.8;
    }
    25% {
      transform: translateY(-40px) translateX(30px) scale(1.4);
      opacity: 1;
    }
    50% {
      transform: translateY(-20px) translateX(-25px) scale(0.8);
      opacity: 0.6;
    }
    75% {
      transform: translateY(-60px) translateX(15px) scale(1.2);
      opacity: 0.9;
    }
  }

  @keyframes floatParticle2 {
    0%,
    100% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0.7;
    }
    33% {
      transform: translateY(-35px) translateX(-30px) scale(1.3);
      opacity: 1;
    }
    66% {
      transform: translateY(-55px) translateX(20px) scale(0.9);
      opacity: 0.8;
    }
  }

  @keyframes floatParticle3 {
    0%,
    100% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-30px) translateX(-10px) scale(1.1);
      opacity: 0.9;
    }
  }
`;
