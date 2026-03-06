import styled from "styled-components";

interface HeroContainerProps {
  imageLoaded?: boolean;
}

export const HeroContainer = styled.section<HeroContainerProps>`
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background:
    linear-gradient(
      180deg,
      rgba(10, 16, 30, 0.55) 0%,
      rgba(10, 16, 30, 0.35) 50%,
      rgba(10, 16, 30, 0.65) 100%
    ),
    ${(props) =>
      props.imageLoaded
        ? `url("/images/mungyu-kim-Ex57cKpwdnE-unsplash.jpg")`
        : "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  text-align: center;
  overflow: hidden;

  @media (max-width: 768px) {
    background-attachment: scroll;
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
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2.2rem, 4.5vw, 3.8rem);
  font-weight: 700;
  max-width: 820px;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #ffffff;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 7vw, 2.6rem);
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.82);
  font-weight: 400;
  margin-bottom: 0;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const HeroForm = styled.div`
  position: relative;
  z-index: 3;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 2.5rem;
  width: 100%;
  max-width: 520px;
  margin: 0 auto 5rem auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0 1rem 3rem 1rem;
    gap: 0.875rem;
  }
`;

export const HeroInput = styled.input`
  padding: 0.875rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  width: 100%;
  background: rgba(255, 255, 255, 0.92);
  color: #1a202c;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  font-family: inherit;

  &:focus {
    border-color: #00bcd4;
    box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.2);
    background: #ffffff;
  }

  &::placeholder {
    color: #718096;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

export const HeroButton = styled.button`
  background: #00bcd4;
  color: white;
  padding: 0.875rem 2.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
  font-family: inherit;
  letter-spacing: 0.02em;
  width: 100%;

  &:hover {
    background: #00acc1;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 188, 212, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 2rem;
  }
`;

// Kept for compatibility — renders nothing
export const FloatingParticles = styled.div`
  display: none;
`;
