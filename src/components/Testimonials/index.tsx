import React from "react";
import {
  TestimonialsSection,
  TestimonialsContainer,
  SectionTitle,
  TestimonialsGrid,
  TestimonialCard,
  TestimonialContent,
  TestimonialAuthor,
  AuthorAvatar,
  AuthorInfo,
  AuthorName,
  AuthorTitle,
  StarsContainer,
  Star,
} from "./styles";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Aimer Ferreira",
      title: "Viajante",
      content:
        "Foi a melhor viagem da minha vida com a Flya, com certeza vou usar sempre!",
      rating: 5,
      avatar: "A",
    },
    {
      id: 2,
      name: "Aimer Ferreira",
      title: "Viajante",
      content:
        "Foi a melhor viagem da minha vida com a Flya, com certeza vou usar sempre!",
      rating: 5,
      avatar: "A",
    },
    {
      id: 3,
      name: "Aimer Ferreira",
      title: "Viajante",
      content:
        "Foi a melhor viagem da minha vida com a Flya, com certeza vou usar sempre!",
      rating: 5,
      avatar: "A",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index}>{index < rating ? "★" : "☆"}</Star>
    ));
  };

  return (
    <TestimonialsSection>
      <TestimonialsContainer>
        <SectionTitle>O que nossos clientes dizem</SectionTitle>
        <TestimonialsGrid>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id}>
              <StarsContainer>{renderStars(testimonial.rating)}</StarsContainer>
              <TestimonialContent>"{testimonial.content}"</TestimonialContent>
              <TestimonialAuthor>
                <AuthorAvatar>{testimonial.avatar}</AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>{testimonial.name}</AuthorName>
                  <AuthorTitle>{testimonial.title}</AuthorTitle>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </TestimonialsContainer>
    </TestimonialsSection>
  );
};

export default Testimonials;
