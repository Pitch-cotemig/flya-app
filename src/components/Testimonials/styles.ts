import styled from "styled-components";

export const TestimonialsSection = styled.section`
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
    animation: floatingBg 20s ease-in-out infinite;
  }

  @keyframes floatingBg {
    0%,
    100% {
      transform: translate(0, 0) scale(1) rotate(0deg);
    }
    50% {
      transform: translate(15px, -15px) scale(1.05) rotate(2deg);
    }
  }
`;

export const TestimonialsContainer = styled.div`
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
  animation: fadeInScale 1.2s ease-out;

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
      shimmer 3s ease-in-out infinite 2s;
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
      rgba(0, 188, 212, 0.4) 50%,
      transparent 100%
    );
    animation: titleTopLine 1.5s ease-out 0.8s both;
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: translateY(-30px) scale(0.9);
    }
    to {
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

  @keyframes shimmer {
    0%,
    100% {
      box-shadow: 0 0 8px rgba(0, 188, 212, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(0, 188, 212, 0.8);
    }
  }
`;

export const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const TestimonialCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.08) 100%
  );
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(15px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  transform: translateY(20px);
  animation: slideInUp 0.8s ease-out forwards;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1);

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    background: linear-gradient(
      135deg,
      rgba(0, 188, 212, 0.1) 0%,
      rgba(0, 188, 212, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 188, 212, 0.25),
      0 8px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(0, 188, 212, 0.3);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );

    &::before {
      opacity: 1;
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(50px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(20px) scale(1);
    }
  }
`;

export const TestimonialContent = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.9);
`;

export const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const AuthorAvatar = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00bcd4 0%, #00acc1 50%, #00bcd4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.3rem;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 188, 212, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);

  &::before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: linear-gradient(135deg, #00bcd4, #00acc1, #00bcd4);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  ${TestimonialCard}:hover & {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(0, 188, 212, 0.6), 0 4px 15px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.4);

    &::before {
      opacity: 1;
    }
  }
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuthorName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const AuthorTitle = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

export const StarsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
  opacity: 0;
  animation: fadeIn 0.6s ease-out 0.8s forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Star = styled.span`
  color: #ffd700;
  font-size: 1.2rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.3);
  }
`;
