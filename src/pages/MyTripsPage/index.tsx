import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { tripsService } from '../../services/tripsService';
import TripCard from '../../components/TripCard';

const TripsContainer = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 24px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${props => props.active ? '#00bcd4' : '#ddd'};
  background: ${props => props.active ? '#00bcd4' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    border-color: #00bcd4;
    background: ${props => props.active ? '#00bcd4' : '#f0f0f0'};
  }
`;

const TripsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
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
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  const fetchTrips = async (favoriteFilter?: boolean) => {
    try {
      const response = await tripsService.findAll(favoriteFilter);
      if(response.success && response.data) {
        setTrips(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Falha ao carregar viagens.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleFilterChange = (newFilter: 'all' | 'favorites') => {
    setFilter(newFilter);
    const favoriteFilter = newFilter === 'favorites' ? true : undefined;
    fetchTrips(favoriteFilter);
  };

  const handleDelete = async (id: string) => {
    const response = await tripsService.remove(id);
    if (response.success) {
      setTrips(prevTrips => prevTrips.filter(trip => trip.id !== id));
    } else {
      setError(response.message);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    const response = await tripsService.toggleFavorite(id);
    if (response.success && response.data) {
      setTrips(prevTrips => 
        prevTrips.map(trip => 
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
    return <TripsContainer><h1>Carregando suas viagens...</h1></TripsContainer>;
  }

  if (error) {
    return <TripsContainer><h1>{error}</h1></TripsContainer>;
  }

  return (
    <TripsContainer>
      <Title>Minhas Viagens</Title>
      
      <FilterContainer>
        <FilterButton 
          active={filter === 'all'} 
          onClick={() => handleFilterChange('all')}
        >
          Todas as Viagens
        </FilterButton>
        <FilterButton 
          active={filter === 'favorites'} 
          onClick={() => handleFilterChange('favorites')}
        >
          Apenas Favoritas
        </FilterButton>
      </FilterContainer>

      {trips.length === 0 ? (
        <p>Você ainda não salvou nenhuma viagem.</p>
      ) : (
        <TripsGrid>
          {trips.map(trip => (
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