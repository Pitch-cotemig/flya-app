import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      name: "Frankfurt, Alemanha",
      description:
        "Cidade cosmopolita com arquitetura moderna e rica cultura histórica",
      image: "/images/frankfurt.png",
    },
    {
      id: 2,
      name: "Fort Lauderdale, Florida",
      description:
        "Praias paradisíacas e canais pitorescos na costa da Florida",
      image: "/images/fortlauderdale.png",
    },
    {
      id: 3,
      name: "Atenas, Grécia",
      description:
        "Berço da civilização ocidental com monumentos históricos únicos",
      image: "/images/atenasgrecia.png",
    },
    {
      id: 4,
      name: "Vancouver, Canadá",
      description: "Paisagens naturais deslumbrantes entre montanhas e oceano",
      image: "/images/dest-canada.png",
    },
    {
      id: 5,
      name: "Tóquio, Japão",
      description: "Metrópole vibrante onde tradição e inovação se encontram",
      image: "/images/dest-tokyo.jpeg",
    },
    {
      id: 6,
      name: "Paris, França",
      description:
        "Cidade Luz com arte, cultura e monumentos icônicos mundialmente",
      image: "/images/Paris.avif",
    },
    {
      id: 7,
      name: "Santorini, Grécia",
      description:
        "Ilha paradisíaca com casas brancas e pores do sol inesquecíveis",
      image: "/images/Gracia.avif",
    },
    {
      id: 8,
      name: "Bali, Indonésia",
      description: "Ilha tropical com templos sagrados e paisagens exuberantes",
      image: "/images/indonesia.jpg",
    },
    {
      id: 9,
      name: "Nova York, EUA",
      description:
        "A cidade que nunca dorme com arranha-céus e energia vibrante",
      image: "/images/New-York.jpg",
    },
    {
      id: 10,
      name: "Maldivas",
      description: "Paraíso tropical com resorts overwater e águas cristalinas",
      image: "/images/Maldivas.jpg",
    },
    {
      id: 11,
      name: "Dubai, Emirados Árabes",
      description:
        "Metrópole futurista com luxo, inovação e arquitetura impressionante",
      image: "/images/Dubas.jpg",
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
            <ChevronLeft size={24} />
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
            <ChevronRight size={24} />
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
