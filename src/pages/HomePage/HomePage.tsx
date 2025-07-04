import React from "react";
import { Hero, DestinationsCarousel, Testimonials } from "@/components";

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <DestinationsCarousel />
      <Testimonials />
    </div>
  );
};

export default HomePage;
