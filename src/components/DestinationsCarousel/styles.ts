import styled from "styled-components";

export const DestinationsSection = styled.section`
  padding: 4rem 2rem;
  background: #2c2c6b;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 30%,
        rgba(0, 188, 212, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 70%,
        rgba(0, 188, 212, 0.1) 0%,
        transparent 50%
      );
    animation: backgroundPulse 8s ease-in-out infinite;
  }

  @keyframes backgroundPulse {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
`;

export const DestinationsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: white;
  position: relative;
  display: inline-block;
  width: 100%;
  animation: slideInFromTop 1s ease-out;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #00bcd4, #00acc1, #00bcd4);
    border-radius: 2px;
    animation: glowLine 2s ease-in-out infinite;
  }

  @keyframes slideInFromTop {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes glowLine {
    0%,
    100% {
      box-shadow: 0 0 5px rgba(0, 188, 212, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(0, 188, 212, 1);
    }
  }
`;

export const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  margin-top: 2rem;

  @media (max-width: 768px) {
    margin: 1rem -2rem 0;
  }
`;

export const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0 1rem;
  }
`;

export const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 188, 212, 0.8);
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 50%;
  z-index: 10;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);

  &:hover {
    background: rgba(0, 188, 212, 1);
    transform: translateY(-50%) scale(1.2);
    box-shadow: 0 8px 25px rgba(0, 188, 212, 0.5);
  }

  &.prev {
    left: 1rem;
    animation: slideInLeft 0.6s ease-out;
  }

  &.next {
    right: 1rem;
    animation: slideInRight 0.6s ease-out;
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateY(-50%) translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(-50%) translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateY(-50%) translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateY(-50%) translateX(0);
    }
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
    padding: 0.5rem;

    &.prev {
      left: 0.5rem;
    }

    &.next {
      right: 0.5rem;
    }
  }
`;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

export const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;

  &.active {
    background: #00bcd4;
    transform: scale(1.4);
    box-shadow: 0 0 10px rgba(0, 188, 212, 0.6);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: scale(1.2);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(0, 188, 212, 0.4);
    transition: all 0.3s ease;
  }

  &:hover::after {
    width: 20px;
    height: 20px;
  }
`;

export const DestinationCard = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 280px;
  min-width: 280px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  flex-shrink: 0;
  transform: translateY(0);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: slideInFromBottom 0.8s ease-out forwards;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
  &:nth-child(4) {
    animation-delay: 0.4s;
  }
  &:nth-child(5) {
    animation-delay: 0.5s;
  }
  &:nth-child(6) {
    animation-delay: 0.6s;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 188, 212, 0.1) 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 188, 212, 0.3);

    &::before {
      opacity: 1;
    }
  }

  @keyframes slideInFromBottom {
    from {
      opacity: 0;
      transform: translateY(50px) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 768px) {
    min-width: 250px;
    height: 250px;
  }

  @media (max-width: 480px) {
    min-width: 220px;
    height: 220px;
  }
`;

export const DestinationImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  ${DestinationCard}:hover & {
    transform: scale(1.1);
  }
`;

export const DestinationOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
  padding: 1.5rem 1rem 1rem;
  color: white;
  z-index: 2;
  transform: translateY(20px);
  transition: transform 0.4s ease;

  ${DestinationCard}:hover & {
    transform: translateY(0);
  }
`;

export const DestinationName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  transform: translateY(10px);
  transition: transform 0.4s ease 0.1s;

  ${DestinationCard}:hover & {
    transform: translateY(0);
  }
`;

export const DestinationDescription = styled.p`
  font-size: 0.85rem;
  opacity: 0.9;
  line-height: 1.4;
  transform: translateY(10px);
  transition: transform 0.4s ease 0.2s;

  ${DestinationCard}:hover & {
    transform: translateY(0);
  }
`;
export const HeroForm = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: rgba(25, 25, 112, 0.9);
  width: 100%;
`;

export const HeroInput = styled.input`
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: #666;
  }
`;

export const HeroButton = styled.button`
  background: #00bcd4;
  color: white;
  padding: 1rem 3rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);

  &:hover {
    background: #00acc1;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 188, 212, 0.4);
  }
`;

export const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    top: 20%;
    left: 10%;
    width: 4px;
    height: 4px;
    background: rgba(0, 188, 212, 0.6);
    border-radius: 50%;
    animation: float1 6s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: 60%;
    right: 15%;
    width: 3px;
    height: 3px;
    background: rgba(0, 188, 212, 0.4);
    border-radius: 50%;
    animation: float2 8s ease-in-out infinite;
  }

  @keyframes float1 {
    0%,
    100% {
      transform: translateY(0) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-20px) scale(1.2);
      opacity: 1;
    }
  }

  @keyframes float2 {
    0%,
    100% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0.4;
    }
    50% {
      transform: translateY(-15px) translateX(10px) scale(1.5);
      opacity: 0.8;
    }
  }
`;
