import styled from 'styled-components';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/atoms/ui/Carousel";
import { Card, CardContent } from "@/components/atoms/ui/Card";
import Autoplay from "embla-carousel-autoplay";

const DestinationsSection = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.custom.darkBlue};
  padding: 9rem 0 3rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 12rem 0 5rem;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 12rem 0 6rem;
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

const SectionTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.main};
`;

const StyledCarousel = styled(Carousel)`
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
`;

const CarouselItemWrapper = styled.div`
  padding: 0.25rem;
`;

const DestinationCard = styled(Card)`
  border: none;
  background: transparent;
`;

const DestinationContent = styled(CardContent)`
  display: flex;
  aspect-ratio: 1;
  align-items: flex-end;
  justify-content: center;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const DestinationImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
`;

const DestinationName = styled.span`
  position: relative;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.main};
`;

const StyledCarouselPrevious = styled(CarouselPrevious)`
  background-color: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.white};
  border: none;
  
  &:hover:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const StyledCarouselNext = styled(CarouselNext)`
  background-color: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.white};
  border: none;
  
  &:hover:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const StyledCarouselItem = styled(CarouselItem)`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-basis: 50%;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-basis: 33.333333%;
  }
`;

const destinations = [
  {
    name: "Frankfurt - Alemanha",
    image: "/images/frankfurt.png",
  },
  {
    name: "Fort Lauderdale - Flórida",
    image: "/images/fortlauderdale.png",
  },
  {
    name: "Atenas - Grécia",
    image: "/images/atenasgrecia.png",
  },
  {
    name: "Moraine Lake - Canadá",
    image: "/images/dest-canada.png",
  },
];

const destinationsWithFour = [
  ...destinations,
  {
    name: "Tóquio - Japão",
    image: "/images/dest-tokyo.jpeg",
  },
];

export function PopularDestinations() {
  return (
    <DestinationsSection>
      <Container>
        <SectionTitle>
          Destinos populares
        </SectionTitle>
        <StyledCarousel 
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
        >
          <CarouselContent>
            {destinationsWithFour.map((dest, index) => (
              <StyledCarouselItem key={index}>
                <CarouselItemWrapper>
                  <DestinationCard>
                    <DestinationContent>
                      <DestinationImage src={dest.image} alt={dest.name} />
                      <ImageOverlay />
                      <DestinationName>
                        {dest.name}
                      </DestinationName>
                    </DestinationContent>
                  </DestinationCard>
                </CarouselItemWrapper>
              </StyledCarouselItem>
            ))}
          </CarouselContent>
          <StyledCarouselPrevious />
          <StyledCarouselNext />
        </StyledCarousel>
      </Container>
    </DestinationsSection>
  );
} 