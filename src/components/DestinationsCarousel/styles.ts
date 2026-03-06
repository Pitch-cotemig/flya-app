import styled from "styled-components";

export const DestinationsSection = styled.section`
  padding: 6rem 2rem;
  color: white;
  position: relative;
  overflow: hidden;
`;

export const DestinationsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: white;
  position: relative;
  display: inline-block;
  width: 100%;

  &::after {
    content: "";
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #00bcd4;
    border-radius: 2px;
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
  background: rgba(0, 188, 212, 0.9);
  color: white;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
  box-shadow:
    0 4px 20px rgba(0, 188, 212, 0.4),
    0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  svg {
    width: 24px;
    height: 24px;
    stroke-width: 2.5;
  }

  &:hover {
    background: rgba(0, 188, 212, 1);
    transform: translateY(-50%) scale(1.15);
    box-shadow:
      0 8px 30px rgba(0, 188, 212, 0.6),
      0 4px 15px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.3);

    svg {
      stroke-width: 3;
    }
  }

  &:active {
    transform: translateY(-50%) scale(1.05);
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;

    svg {
      width: 20px;
      height: 20px;
    }

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
  align-items: center;
  gap: 0.8rem;
  margin-top: 3rem;
  padding: 1rem;
`;

export const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  transition:
    background 0.25s ease,
    transform 0.25s ease;

  &.active {
    background: #00bcd4;
    transform: scale(1.4);
  }

  &:hover:not(.active) {
    background: rgba(255, 255, 255, 0.65);
  }
`;

export const DestinationCard = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 320px;
  min-width: 300px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  flex-shrink: 0;
  transform: translateY(0);
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-10px) scale(1.01);
    z-index: 10;

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    min-width: 280px;
    height: 280px;
  }

  @media (max-width: 480px) {
    min-width: 260px;
    height: 260px;
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
  padding: 2rem 1.5rem 1.5rem;
  color: white;
  z-index: 2;
  transform: translateY(35px);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 188, 212, 0.5) 50%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${DestinationCard}:hover & {
    transform: translateY(0);
    background: linear-gradient(
      transparent 0%,
      rgba(0, 0, 0, 0.4) 20%,
      rgba(0, 0, 0, 0.9) 60%,
      rgba(0, 0, 0, 0.98) 100%
    );
    backdrop-filter: blur(2px);

    &::before {
      opacity: 1;
    }
  }
`;

export const DestinationName = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #ffffff;
  transform: translateY(0);
  opacity: 1;
`;

export const DestinationDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0;
  line-height: 1.5;
  transform: translateY(20px);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;

  ${DestinationCard}:hover & {
    transform: translateY(0);
    opacity: 1;
    color: rgba(255, 255, 255, 1);
  }
`;

// Kept for import compatibility — renders nothing
export const FloatingElements = styled.div`
  display: none;
`;
