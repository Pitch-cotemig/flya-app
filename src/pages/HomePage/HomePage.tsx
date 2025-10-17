import React from "react";
import styled from "styled-components";
import { Hero, DestinationsCarousel, Testimonials } from "@/components";
import { User } from "../../services/authService";

interface HomePageProps {
  user?: User | null;
}

const HomePageContainer = styled.div`
  position: relative;

  /* Smooth transitions between sections */
  & > * {
    animation: fadeInSection 0.8s ease-out;
  }

  & > *:nth-child(2) {
    animation-delay: 0.2s;
    animation-fill-mode: both;
  }

  & > *:nth-child(3) {
    animation-delay: 0.4s;
    animation-fill-mode: both;
  }

  @keyframes fadeInSection {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HomePage: React.FC<HomePageProps> = ({ user }) => {
  return (
    <HomePageContainer>
      <Hero user={user} />
      <DestinationsCarousel />
      <Testimonials />
    </HomePageContainer>
  );
};

export default HomePage;
