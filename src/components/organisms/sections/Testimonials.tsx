import styled from 'styled-components';
import { Avatar } from "@/components/atoms/ui/Avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/ui/Card";

const TestimonialsSection = styled.section`
  width: 100%;
  padding: 3rem 0;
  background-color: ${({ theme }) => theme.colors.custom.darkBlue};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 5rem 0;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 6rem 0;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 1rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 1.5rem;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.main};
`;

const TitleUnderline = styled.div`
  margin-top: 0.5rem;
  height: 0.25rem;
  width: 6rem;
  background-color: ${({ theme }) => theme.colors.primary[600]};
  margin-left: auto;
  margin-right: auto;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TestimonialCard = styled(Card)`
  background-color: rgba(226, 232, 240, 0.9);
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const TestimonialHeader = styled(CardHeader)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const TestimonialInfo = styled.div``;

const TestimonialName = styled(CardTitle)`
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
`;

const StarRatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.125rem;
`;

const StarIcon = styled.svg<{ filled: boolean }>`
  height: 1.25rem;
  width: 1.25rem;
  color: ${({ filled, theme }) => filled ? '#fbbf24' : theme.colors.gray[300]};
  fill: currentColor;
`;

const TestimonialContent = styled(CardContent)``;

const TestimonialText = styled.p`
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.fonts.main};
`;

const testimonials = [
  {
    name: "Abner Ferreira",
    avatar: "/images/avatar-placeholder.png",
    rating: 5,
    review: "Fiz a melhor viagem da minha vida com a Flya, com certeza vou usar denovo!",
  },
  {
    name: "Abner Ferreira",
    avatar: "/images/avatar-placeholder.png",
    rating: 5,
    review: "Fiz a melhor viagem da minha vida com a Flya, com certeza vou usar denovo!",
  },
  {
    name: "Abner Ferreira",
    avatar: "/images/avatar-placeholder.png",
    rating: 5,
    review: "Fiz a melhor viagem da minha vida com a Flya, com certeza vou usar denovo!",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <StarRatingContainer>
    {[...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        filled={i < rating}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </StarIcon>
    ))}
  </StarRatingContainer>
);

export function Testimonials() {
  return (
    <TestimonialsSection>
      <Container>
        <HeaderSection>
          <SectionTitle>
            O que nossos clientes dizem
          </SectionTitle>
          <TitleUnderline />
        </HeaderSection>

        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <TestimonialHeader>
                <Avatar 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  fallback={testimonial.name.charAt(0)}
                />
                <TestimonialInfo>
                  <TestimonialName>{testimonial.name}</TestimonialName>
                  <StarRating rating={testimonial.rating} />
                </TestimonialInfo>
              </TestimonialHeader>
              <TestimonialContent>
                <TestimonialText>"{testimonial.review}"</TestimonialText>
              </TestimonialContent>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </Container>
    </TestimonialsSection>
  );
} 