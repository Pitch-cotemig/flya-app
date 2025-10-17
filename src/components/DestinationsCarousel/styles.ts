import styled from "styled-components";

export const DestinationsSection = styled.section`
  padding: 6rem 2rem;
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
    animation: backgroundShift 15s ease-in-out infinite;
  }

  @keyframes backgroundShift {
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
`;

export const DestinationsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: white;
  position: relative;
  display: inline-block;
  width: 100%;
  animation: titleSlideIn 1.2s ease-out;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 5px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      #00bcd4 25%,
      #00acc1 50%,
      #00bcd4 75%,
      transparent 100%
    );
    border-radius: 3px;
    animation: titleUnderline 1.5s ease-out 0.5s both,
      shimmerLine 3s ease-in-out infinite 2s;
  }

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 20%;
    width: 60%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 188, 212, 0.3) 50%,
      transparent 100%
    );
    animation: titleTopLine 1.5s ease-out 0.8s both;
  }

  @keyframes titleSlideIn {
    0% {
      opacity: 0;
      transform: translateY(-40px) scale(0.9);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes titleUnderline {
    0% {
      width: 0;
      opacity: 0;
    }
    100% {
      width: 120px;
      opacity: 1;
    }
  }

  @keyframes titleTopLine {
    0% {
      width: 0;
      opacity: 0;
    }
    100% {
      width: 60%;
      opacity: 1;
    }
  }

  @keyframes shimmerLine {
    0%,
    100% {
      box-shadow: 0 0 8px rgba(0, 188, 212, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(0, 188, 212, 0.8);
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
  box-shadow: 0 4px 20px rgba(0, 188, 212, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  svg {
    width: 24px;
    height: 24px;
    stroke-width: 2.5;
  }

  &:hover {
    background: rgba(0, 188, 212, 1);
    transform: translateY(-50%) scale(1.15);
    box-shadow: 0 8px 30px rgba(0, 188, 212, 0.6), 0 4px 15px rgba(0, 0, 0, 0.2);
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
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  backdrop-filter: blur(5px);

  &.active {
    background: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
    transform: scale(1.5);
    box-shadow: 0 0 15px rgba(0, 188, 212, 0.8), 0 0 30px rgba(0, 188, 212, 0.4);
  }

  &:hover:not(.active) {
    background: rgba(255, 255, 255, 0.7);
    transform: scale(1.2);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
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
    background: rgba(0, 188, 212, 0.3);
    transition: all 0.3s ease;
  }

  &:hover::after {
    width: 24px;
    height: 24px;
    opacity: 0.2;
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
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  opacity: 0;
  animation: slideInFromBottom 0.8s ease-out forwards;
  background: linear-gradient(
    135deg,
    rgba(0, 188, 212, 0.05) 0%,
    rgba(28, 28, 67, 0.1) 100%
  );

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
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-15px) scale(1.02);
    z-index: 10;

    &::before {
      opacity: 1;
    }
  }

  @keyframes slideInFromBottom {
    from {
      opacity: 0;
      transform: translateY(60px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
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
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s;
  background: linear-gradient(135deg, #ffffff 0%, #e0f7ff 50%, #00bcd4 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;

  ${DestinationCard}:hover & {
    transform: translateY(0);
    opacity: 1;
    background: linear-gradient(135deg, #ffffff 0%, #00bcd4 50%, #ffffff 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
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
    top: 25%;
    left: 8%;
    width: 6px;
    height: 6px;
    background: rgba(0, 188, 212, 0.7);
    border-radius: 50%;
    animation: float1 10s ease-in-out infinite;
    box-shadow: 0 0 15px rgba(0, 188, 212, 0.5);
  }

  &::after {
    content: "";
    position: absolute;
    top: 70%;
    right: 12%;
    width: 4px;
    height: 4px;
    background: rgba(0, 188, 212, 0.6);
    border-radius: 50%;
    animation: float2 12s ease-in-out infinite;
    box-shadow: 0 0 12px rgba(0, 188, 212, 0.4);
  }

  @keyframes float1 {
    0%,
    100% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0.7;
    }
    25% {
      transform: translateY(-30px) translateX(15px) scale(1.3);
      opacity: 1;
    }
    50% {
      transform: translateY(-15px) translateX(-10px) scale(0.8);
      opacity: 0.5;
    }
    75% {
      transform: translateY(-40px) translateX(5px) scale(1.1);
      opacity: 0.9;
    }
  }

  @keyframes float2 {
    0%,
    100% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0.6;
    }
    33% {
      transform: translateY(-25px) translateX(-15px) scale(1.2);
      opacity: 1;
    }
    66% {
      transform: translateY(-35px) translateX(10px) scale(0.9);
      opacity: 0.8;
    }
  }
`;
