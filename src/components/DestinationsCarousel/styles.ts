import styled from "styled-components";

export const DestinationsSection = styled.section`
  padding: 4rem 2rem;
  background: #1c1c43;
  color: white;
`;

export const DestinationsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: white;
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
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0 1rem;
  }
`;

export const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 50%;
  z-index: 10;
  transition: all 0.3s ease;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
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
  transition: all 0.3s ease;

  &.active {
    background: #00bcd4;
    transform: scale(1.2);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }
`;

export const DestinationCard = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 400px;
  min-width: 320px;
  cursor: pointer;
  transition: transform 0.3s ease;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 768px) {
    min-width: 280px;
    height: 350px;
  }

  @media (max-width: 480px) {
    min-width: 250px;
    height: 300px;
  }
`;

export const DestinationImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DestinationOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem 1.5rem 1.5rem;
  color: white;
`;

export const DestinationName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const DestinationDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
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
