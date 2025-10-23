import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { tripsService } from "../../services/tripsService";
import TripCard from "../../components/TripCard";
import { FlyaLoading } from "../../components/FlyaLoading";
import { colors } from "../../design-tokens/colors";
import { Lock, AlertTriangle, Star, Plane } from "lucide-react";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const subtleFloat = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-2px);
  }
`;

const TripsContainer = styled.div`
  min-height: 100vh;
  padding: 100px 1rem 60px;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 110px 1.5rem 70px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 120px 2rem 80px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 140px 2rem 100px;
  }
`;

const Header = styled.header`
  max-width: 1200px;
  margin: 0 auto 40px;
  text-align: center;
  animation: ${fadeInUp} 0.8s ease-out;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 50px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 60px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-bottom: 80px;
  }
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 12px;
  background: ${colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  line-height: 1.1;
  padding: 0 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 16px;
    padding: 0;
  }
`;

const Subtitle = styled.p`
  font-size: 0.9375rem;
  color: ${colors.text.muted};
  margin-bottom: 32px;
  font-weight: 400;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  padding: 0 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
    margin-bottom: 40px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.125rem;
    margin-bottom: 48px;
    max-width: 600px;
    padding: 0;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 40px;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  padding: 0 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 10px;
    margin-bottom: 50px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 12px;
    margin-bottom: 60px;
    padding: 0;
  }
`;

const FilterButton = styled.button<{ active?: boolean }>`
  background: ${(props) =>
    props.active ? colors.gradients.primary : colors.background.primaryAlpha};
  backdrop-filter: blur(12px);
  color: ${(props) => (props.active ? colors.text.primary : colors.text.muted)};
  border: 2px solid
    ${(props) => (props.active ? "transparent" : colors.alpha.white01)};
  border-radius: 25px;
  padding: 8px 16px;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) =>
    props.active ? colors.shadow.cyan : colors.shadow.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 10px 20px;
    font-size: 0.875rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 12px 24px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.active ? colors.shadow.cyanStrong : colors.shadow.md};
    border-color: ${(props) =>
      props.active ? "transparent" : colors.alpha.cyan03};
    color: ${colors.text.primary};
  }

  &:active {
    transform: translateY(0px);
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  padding: 0 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 24px;
    margin-bottom: 50px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 32px;
    margin-bottom: 60px;
    padding: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: 40px;
  }
`;

const StatCard = styled.div`
  background: ${colors.background.primaryAlpha};
  backdrop-filter: blur(12px);
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid ${colors.alpha.white01};
  box-shadow: ${colors.shadow.card};
  text-align: center;
  min-width: 100px;
  flex: 1;
  max-width: 150px;
  transition: all 0.3s ease;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 20px 24px;
    border-radius: 14px;
    min-width: 110px;
    max-width: 160px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 24px 32px;
    border-radius: 16px;
    min-width: 120px;
    max-width: none;
    flex: 0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.cardHover};
    border-color: ${colors.alpha.cyan03};
  }

  .number {
    font-size: 1.5rem;
    font-weight: 700;
    background: ${colors.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 4px;
    display: block;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 1.75rem;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 2rem;
    }
  }

  .label {
    font-size: 0.75rem;
    color: ${colors.text.muted};
    font-weight: 500;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 0.8125rem;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 0.875rem;
    }
  }
`;

const TripsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 40px;
  padding: 0 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    padding: 0 1rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 28px;
    padding: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 32px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 1.5rem;
  color: ${colors.text.muted};
  background: ${colors.background.primaryAlpha};
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid ${colors.alpha.white01};
  box-shadow: ${colors.shadow.card};
  animation: ${subtleFloat} 3s ease-in-out infinite;
  margin: 0 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 80px 2rem;
    border-radius: 18px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 100px 32px;
    border-radius: 20px;
    margin: 0;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 12px;
    color: ${colors.text.primary};
    font-weight: 600;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 1.5rem;
      margin-bottom: 16px;
    }
  }

  p {
    font-size: 0.9375rem;
    line-height: 1.6;
    max-width: 90%;
    margin: 0 auto 20px;
    color: ${colors.text.muted};

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 1rem;
      max-width: 400px;
      margin-bottom: 24px;
    }
  }

  .emoji {
    font-size: 2.5rem;
    margin-bottom: 20px;
    display: block;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 3rem;
      margin-bottom: 24px;
    }
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 40px 1.5rem;
  background: ${colors.background.primaryAlpha};
  backdrop-filter: blur(12px);
  border-radius: 14px;
  border: 1px solid ${colors.alpha.error02};
  color: ${colors.state.error};
  box-shadow: ${colors.shadow.error};
  margin: 0 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 50px 2rem;
    border-radius: 15px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 60px 32px;
    border-radius: 16px;
    margin: 0;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 16px;
    font-weight: 600;
  }

  p {
    color: ${colors.text.muted};
    margin-bottom: 24px;
    line-height: 1.6;
  }

  .error-icon {
    font-size: 3rem;
    margin-bottom: 20px;
    display: block;
    opacity: 0.7;
  }
`;

const ActionButton = styled.button`
  background: ${colors.gradients.primary};
  color: ${colors.text.primary};
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${colors.shadow.cyan};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.cyanStrong};
  }

  &:active {
    transform: translateY(0px);
  }
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
  const [allTrips, setAllTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "favorites">("all");
  const navigate = useNavigate();

  const fetchTrips = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await tripsService.findAll();
      if (response.success && response.data) {
        setAllTrips(response.data);
      } else {
        if (
          response.message?.includes("JWT") ||
          response.message?.includes("token") ||
          response.message?.includes("expired") ||
          response.message?.includes("sessão expirou")
        ) {
          setError("Sua sessão expirou. Redirecionando para o login...");

          setTimeout(() => {
            navigate("/auth");
          }, 2000);
        } else {
          setError(response.message || "Erro ao carregar viagens");
        }
      }
    } catch (err) {
      console.error("Erro ao buscar viagens:", err);
      setError("Falha ao carregar viagens. Verifique sua conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleFilterChange = (newFilter: "all" | "favorites") => {
    setFilter(newFilter);
  };

  const handleDelete = async (id: string) => {
    const response = await tripsService.remove(id);
    if (response.success) {
      setAllTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
    } else {
      setError(response.message || "Erro ao excluir viagem");
    }
  };

  const handleToggleFavorite = async (id: string) => {
    const response = await tripsService.toggleFavorite(id);
    if (response.success && response.data) {
      setAllTrips((prevTrips) =>
        prevTrips.map((trip) =>
          trip.id === id
            ? { ...trip, is_favorite: response.data!.is_favorite }
            : trip
        )
      );
    } else {
      setError(response.message || "Erro ao favoritar viagem");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/auth");
  };

  const handleRetry = () => {
    fetchTrips();
  };

  const filteredTrips =
    filter === "favorites"
      ? allTrips.filter((trip) => trip.is_favorite)
      : allTrips;

  const totalTrips = allTrips.length;
  const favoriteTrips = allTrips.filter((trip) => trip.is_favorite).length;

  if (isLoading) {
    return <FlyaLoading text="Carregando suas viagens..." size="medium" />;
  }

  if (error) {
    const isJWTError =
      error.includes("sessão expirou") ||
      error.includes("JWT") ||
      error.includes("token");

    return (
      <TripsContainer>
        <Header>
          <Title>Minhas Viagens</Title>
          <Subtitle>Algo deu errado</Subtitle>
        </Header>
        <ContentWrapper>
          <ErrorContainer>
            <span className="error-icon">
              {isJWTError ? <Lock size={48} /> : <AlertTriangle size={48} />}
            </span>
            <h3>{isJWTError ? "Sessão Expirada" : "Oops! Algo deu errado"}</h3>
            <p>{error}</p>
            {isJWTError ? (
              <ActionButton onClick={handleLoginRedirect}>
                Fazer Login
              </ActionButton>
            ) : (
              <ActionButton onClick={handleRetry}>
                Tentar Novamente
              </ActionButton>
            )}
          </ErrorContainer>
        </ContentWrapper>
      </TripsContainer>
    );
  }

  return (
    <TripsContainer>
      <Header>
        <Title>Minhas Viagens</Title>
        <Subtitle>
          Suas aventuras organizadas e prontas para serem vividas
        </Subtitle>
      </Header>

      <ContentWrapper>
        {totalTrips > 0 && (
          <StatsContainer>
            <StatCard>
              <span className="number">{totalTrips}</span>
              <span className="label">
                {totalTrips === 1 ? "Viagem" : "Viagens"}
              </span>
            </StatCard>
            <StatCard>
              <span className="number">{favoriteTrips}</span>
              <span className="label">
                {favoriteTrips === 1 ? "Favorita" : "Favoritas"}
              </span>
            </StatCard>
          </StatsContainer>
        )}

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
            <Star size={16} />
            Favoritas
          </FilterButton>
        </FilterContainer>

        {filteredTrips.length === 0 ? (
          <EmptyState>
            <Plane size={48} className="emoji" />
            <h3>
              {filter === "favorites"
                ? "Nenhuma viagem favorita ainda"
                : "Sua primeira aventura está esperando!"}
            </h3>
            <p>
              {filter === "favorites"
                ? "Marque suas viagens especiais como favoritas para encontrá-las facilmente aqui."
                : "Comece a planejar sua próxima viagem dos sonhos. Que tal começar agora?"}
            </p>
          </EmptyState>
        ) : (
          <TripsGrid>
            {filteredTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </TripsGrid>
        )}
      </ContentWrapper>
    </TripsContainer>
  );
};

export default MyTripsPage;
