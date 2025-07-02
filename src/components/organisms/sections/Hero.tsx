import styled from 'styled-components';

const HeroSection = styled.section`
  position: relative;
  display: flex;
  height: 600px;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  background-image: url('/images/4k-praia 1.png');
  background-size: cover;
  background-position: center;
  margin-top: -7rem;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
`;

const HeroTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  font-family: ${({ theme }) => theme.fonts.main};
  line-height: 1.1;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.75rem;
  }
`;

export function Hero() {
  return (
    <HeroSection>
      <HeroOverlay />
      
      <HeroContent>
        <HeroTitle>
          Sua viagem dos sonhos <br /> planejada com IA
        </HeroTitle>
      </HeroContent>
    </HeroSection>
  );
} 