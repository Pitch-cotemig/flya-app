import styled from "styled-components";

export const TestimonialsSection = styled.section`
  padding: 4rem 2rem;
  background: #1c1c43;
  color: white;
`;

export const TestimonialsContainer = styled.div`
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

export const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
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
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00bcd4 0%, #0097a7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
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
`;
