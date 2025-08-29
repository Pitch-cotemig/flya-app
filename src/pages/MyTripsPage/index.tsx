import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { tripsService } from "../../services/tripsService";
import TripCard from "../../components/TripCard";
import { colors } from "../../design-tokens/colors";

const TripsContainer = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        ${colors.alpha.cyan02} 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        ${colors.alpha.purple02} 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 40%,
        ${colors.alpha.cyan02} 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #00bcd4 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 2;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  border: 2px solid
    ${(props) =>
      props.active ? "${colors.primary.cyan}" : "${colors.alpha.white03}"};
  background: ${(props) =>
    props.active ? "${colors.gradients.primary}" : "${colors.alpha.white01}"};
  color: ${(props) => (props.active ? "white" : "#fff")};
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;

  &:hover {
    border-color: ${colors.primary.cyan};
    background: ${(props) =>
      props.active
        ? "${colors.gradients.cyanHover}"
        : "${colors.alpha.cyan02}"};
    transform: translateY(-2px);
  }
`;

const TripsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  position: relative;
  z-index: 2;
`;

interface Trip {
  id: string;
  plan_result: string;
  is_favorite?: boolean;
  prompt_data?: object;
  ai_prompt?: string;
  created_at?: string;
}

const MyTripsPage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "favorites">("all");

  const fetchTrips = async (favoriteFilter?: boolean) => {
    try {
      const response = await tripsService.findAll(favoriteFilter);
      if (response.success && response.data) {
        setTrips(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Falha ao carregar viagens.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleFilterChange = (newFilter: "all" | "favorites") => {
    setFilter(newFilter);
    const favoriteFilter = newFilter === "favorites" ? true : undefined;
    fetchTrips(favoriteFilter);
  };

  const handleDelete = async (id: string) => {
    const response = await tripsService.remove(id);
    if (response.success) {
      setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
    } else {
      setError(response.message);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    const response = await tripsService.toggleFavorite(id);
    if (response.success && response.data) {
      setTrips((prevTrips) =>
        prevTrips.map((trip) =>
          trip.id === id
            ? { ...trip, is_favorite: response.data!.is_favorite }
            : trip
        )
      );
    } else {
      setError(response.message);
    }
  };

  if (isLoading) {
    return (
      <TripsContainer>
        <Title style={{ zIndex: 2, position: "relative" }}>
          Carregando suas viagens...
        </Title>
      </TripsContainer>
    );
  }

  if (error) {
    return (
      <TripsContainer>
        <Title style={{ zIndex: 2, position: "relative", color: "#ff4d4f" }}>
          {error}
        </Title>
      </TripsContainer>
    );
  }

  return (
    <TripsContainer>
      <Title>Minhas Viagens</Title>

      <FilterContainer>
        <FilterButton
          active={filter === "all"}
          onClick={() => handleFilterChange("all")}
        >
          Todas as Viagens
        </FilterButton>
        <FilterButton
          active={filter === "favorites"}
          onClick={() => handleFilterChange("favorites")}
        >
          Apenas Favoritas
        </FilterButton>
      </FilterContainer>

      {trips.length === 0 ? (
        <p
          style={{
            color: "#fff",
            fontSize: "1.2rem",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          Você ainda não salvou nenhuma viagem.
        </p>
      ) : (
        <TripsGrid>
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </TripsGrid>
      )}
    </TripsContainer>
  );
};

export default MyTripsPage;
