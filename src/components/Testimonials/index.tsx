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
      name: "Marina Silva",
      title: "Executiva de Marketing",
      content:
        "A Flya transformou completamente a maneira como planejo minhas viagens. A IA é incrível e os destinos sugeridos foram perfeitos!",
      rating: 5,
      avatar: "M",
    },
    {
      id: 2,
      name: "Carlos Eduardo",
      title: "Fotógrafo de Viagem",
      content:
        "Como profissional que viaja constantemente, encontrei na Flya uma ferramenta essencial. O planejamento inteligente economiza horas do meu tempo.",
      rating: 5,
      avatar: "C",
    },
    {
      id: 3,
      name: "Ana Beatriz",
      title: "Estudante de Turismo",
      content:
        "Realizei meu sonho de conhecer a Europa com ajuda da Flya. O roteiro personalizado foi perfeito para meu orçamento estudantil!",
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
