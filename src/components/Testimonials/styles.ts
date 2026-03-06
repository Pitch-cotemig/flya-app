import styled from "styled-components";

export const TestimonialsSection = styled.section`
  padding: 6rem 2rem;
  color: white;
  position: relative;
  overflow: hidden;
`;

export const TestimonialsContainer = styled.div`
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
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-8px);
    box-shadow:
      0 16px 48px rgba(0, 188, 212, 0.2),
      0 8px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(0, 188, 212, 0.25);
    background: rgba(255, 255, 255, 0.11);
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
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00bcd4 0%, #0097a7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 188, 212, 0.35);
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
`;

export const Star = styled.span`
  color: #ffd700;
  font-size: 1.2rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.3);
  }
`;
