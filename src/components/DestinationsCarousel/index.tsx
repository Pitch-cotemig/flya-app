import React, { useState, useEffect } from "react";
import {
  DestinationsSection,
  DestinationsContainer,
  SectionTitle,
  CarouselContainer,
  CarouselTrack,
  CarouselButton,
  DotsContainer,
  Dot,
  DestinationCard,
  DestinationImage,
  DestinationOverlay,
  DestinationName,
  DestinationDescription,
  FloatingElements,
} from "./styles";

const DestinationsCarousel: React.FC = () => {
  const destinations = [
    {
      id: 1,
      name: "Frankfurt - Alemanha",
      description: "Cidade histórica com arquitetura medieval encantadora",
      image: "/images/frankfurt.png",
    },
    {
      id: 2,
      name: "Fort Lauderdale - Florida",
      description: "Praias paradisíacas e vida noturna vibrante",
      image: "/images/fortlauderdale.png",
    },
    {
      id: 3,
      name: "Atenas - Grécia",
      description: "Berço da civilização ocidental com história milenar",
      image: "/images/atenasgrecia.png",
    },
    {
      id: 4,
      name: "Canadá",
      description: "Paisagens naturais deslumbrantes e aventuras ao ar livre",
      image: "/images/dest-canada.png",
    },
    {
      id: 5,
      name: "Tóquio - Japão",
      description: "Cultura moderna e tradições milenares em perfeita harmonia",
      image: "/images/dest-tokyo.jpeg",
    },
    {
      id: 6,
      name: "Praia Paradisíaca",
      description: "Águas cristalinas e areias douradas para relaxar",
      image: "/images/4k-praia 1.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth <= 480) {
        setItemsPerView(1);
      } else if (window.innerWidth <= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, destinations.length - itemsPerView);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Touch support for mobile devices
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <DestinationsSection>
      <FloatingElements />
      <DestinationsContainer>
        <SectionTitle>Destinos populares</SectionTitle>
        <CarouselContainer>
          <CarouselButton className="prev" onClick={goToPrevious}>
            ‹
          </CarouselButton>
          <CarouselTrack
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {destinations.map((destination) => (
              <DestinationCard key={destination.id}>
                <DestinationImage
                  src={destination.image}
                  alt={destination.name}
                />
                <DestinationOverlay>
                  <DestinationName>{destination.name}</DestinationName>
                  <DestinationDescription>
                    {destination.description}
                  </DestinationDescription>
                </DestinationOverlay>
              </DestinationCard>
            ))}
          </CarouselTrack>
          <CarouselButton className="next" onClick={goToNext}>
            ›
          </CarouselButton>
        </CarouselContainer>
        <DotsContainer>
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <Dot
              key={index}
              className={index === currentIndex ? "active" : ""}
              onClick={() => goToSlide(index)}
            />
          ))}
        </DotsContainer>
      </DestinationsContainer>
    </DestinationsSection>
  );
};

export default DestinationsCarousel;
