import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  MapPin,
  Star,
  Calendar,
  DollarSign,
  Plane,
  Clock,
  BarChart3,
  PlusCircle,
  Map,
  Briefcase,
  RefreshCw,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { FlyaLoading } from "../../components/FlyaLoading";
import {
  dashboardService,
  DashboardStats,
} from "../../services/dashboardService";
import {
  DashboardContainer,
  Header,
  Title,
  Subtitle,
  ContentWrapper,
  StatsGrid,
  StatCard,
  SectionsGrid,
  Section,
  SectionTitle,
  RecentTripsList,
  RecentTripItem,
  ChartContainer,
  ChartBar,
  DestinationsList,
  DestinationItem,
  QuickActionsGrid,
  QuickActionCard,
  EmptyState,
  ActionButton,
  ErrorContainer,
  RefreshButton,
} from "./styles";
import { User } from "../../services/authService";

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await dashboardService.getStats();
      if (response.success && response.data) {
        setStats(response.data);
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
          setError(
            response.message || "Erro ao carregar estatísticas do dashboard"
          );
        }
      }
    } catch (err) {
      console.error("Erro ao buscar estatísticas:", err);
      setError("Falha ao carregar dashboard. Verifique sua conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = () => {
    fetchStats();
  };

  const handleLoginRedirect = () => {
    navigate("/auth");
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Data não especificada";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  if (isLoading) {
    return (
      <FlyaLoading text="Carregando seu dashboard..." size="medium" />
    );
  }

  if (error) {
    const isJWTError =
      error.includes("sessão expirou") ||
      error.includes("JWT") ||
      error.includes("token");

    return (
      <DashboardContainer>
        <Header>
          <Title>Dashboard</Title>
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
              <ActionButton onClick={handleRefresh}>
                Tentar Novamente
              </ActionButton>
            )}
          </ErrorContainer>
        </ContentWrapper>
      </DashboardContainer>
    );
  }

  if (!stats || stats.totalTrips === 0) {
    return (
      <DashboardContainer>
        <Header>
          <Title>Bem-vindo, {user.firstName}!</Title>
          <Subtitle>Comece sua jornada de viagens hoje</Subtitle>
        </Header>
        <ContentWrapper>
          <EmptyState>
            <Plane size={64} className="icon" />
            <h3>Nenhuma viagem planejada ainda</h3>
            <p>
              Você ainda não criou nenhuma viagem. Que tal começar a planejar
              sua próxima aventura? Nossa IA está pronta para ajudá-lo a criar
              o roteiro perfeito!
            </p>
            <ActionButton onClick={() => navigate("/Planejamento")}>
              <PlusCircle size={20} />
              Planejar Primeira Viagem
            </ActionButton>
          </EmptyState>
        </ContentWrapper>
      </DashboardContainer>
    );
  }

  // Calculate max count for chart scaling
  const maxMonthlyTrips = Math.max(
    ...stats.tripsByMonth.map((m) => m.count),
    1
  );

  return (
    <DashboardContainer>
      <Header>
        <Title>Bem-vindo de volta, {user.firstName}!</Title>
        <Subtitle>
          Aqui está um resumo das suas aventuras e planejamentos
        </Subtitle>
        <RefreshButton onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw size={16} />
          Atualizar
        </RefreshButton>
      </Header>

      <ContentWrapper>
        {/* Stats Cards */}
        <StatsGrid>
          <StatCard>
            <div className="icon-wrapper">
              <Plane size={24} color="white" />
            </div>
            <span className="number">{stats.totalTrips}</span>
            <span className="label">
              {stats.totalTrips === 1 ? "Viagem" : "Viagens"}
            </span>
          </StatCard>

          <StatCard>
            <div className="icon-wrapper">
              <Star size={24} color="white" />
            </div>
            <span className="number">{stats.favoriteTrips}</span>
            <span className="label">
              {stats.favoriteTrips === 1 ? "Favorita" : "Favoritas"}
            </span>
          </StatCard>

          <StatCard>
            <div className="icon-wrapper">
              <MapPin size={24} color="white" />
            </div>
            <span className="number">{stats.totalDestinations}</span>
            <span className="label">
              {stats.totalDestinations === 1 ? "Destino" : "Destinos"}
            </span>
          </StatCard>

          <StatCard>
            <div className="icon-wrapper">
              <Clock size={24} color="white" />
            </div>
            <span className="number">{stats.averageTripDuration}</span>
            <span className="label">Dias Médios</span>
          </StatCard>

          {stats.totalBudgetSpent > 0 && (
            <StatCard>
              <div className="icon-wrapper">
                <DollarSign size={24} color="white" />
              </div>
              <span className="number">
                {formatCurrency(stats.totalBudgetSpent)}
              </span>
              <span className="label">Orçamento Total</span>
            </StatCard>
          )}
        </StatsGrid>

        {/* Quick Actions */}
        <QuickActionsGrid>
          <QuickActionCard onClick={() => navigate("/Planejamento")}>
            <div className="action-icon">
              <PlusCircle size={28} color="white" />
            </div>
            <span className="action-label">Nova Viagem</span>
          </QuickActionCard>

          <QuickActionCard onClick={() => navigate("/Minhas-Viagens")}>
            <div className="action-icon">
              <Map size={28} color="white" />
            </div>
            <span className="action-label">Minhas Viagens</span>
          </QuickActionCard>

          <QuickActionCard onClick={() => navigate("/Minha-Mala")}>
            <div className="action-icon">
              <Briefcase size={28} color="white" />
            </div>
            <span className="action-label">Minha Mala</span>
          </QuickActionCard>
        </QuickActionsGrid>

        {/* Main Content Grid */}
        <SectionsGrid>
          {/* Recent Trips & Chart */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Recent Trips */}
            {stats.recentTrips.length > 0 && (
              <Section>
                <SectionTitle>
                  <Calendar size={24} className="icon" />
                  Viagens Recentes
                </SectionTitle>
                <RecentTripsList>
                  {stats.recentTrips.map((trip) => (
                    <RecentTripItem
                      key={trip.id}
                      onClick={() => navigate("/Minhas-Viagens")}
                    >
                      <div className="trip-info">
                        <div className="trip-destination">
                          <MapPin size={16} />
                          {trip.destination}
                          {trip.isFavorite && (
                            <Star size={14} fill="currentColor" />
                          )}
                        </div>
                        <div className="trip-dates">
                          {trip.startDate && trip.endDate
                            ? `${formatDate(trip.startDate)} - ${formatDate(
                                trip.endDate
                              )}`
                            : "Datas não especificadas"}
                        </div>
                      </div>
                    </RecentTripItem>
                  ))}
                </RecentTripsList>
              </Section>
            )}

            {/* Trips by Month Chart */}
            <Section>
              <SectionTitle>
                <BarChart3 size={24} className="icon" />
                Viagens por Mês
              </SectionTitle>
              <ChartContainer>
                {stats.tripsByMonth.map((month) => (
                  <ChartBar key={`${month.month}-${month.year}`}>
                    <span className="month-label">{month.month}</span>
                    <div className="bar-wrapper">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${(month.count / maxMonthlyTrips) * 100}%`,
                        }}
                      >
                        {month.count > 0 && (
                          <span className="count">{month.count}</span>
                        )}
                      </div>
                    </div>
                  </ChartBar>
                ))}
              </ChartContainer>
            </Section>
          </div>

          {/* Most Visited Destinations */}
          {stats.mostVisitedDestinations.length > 0 && (
            <Section>
              <SectionTitle>
                <TrendingUp size={24} className="icon" />
                Destinos Mais Visitados
              </SectionTitle>
              <DestinationsList>
                {stats.mostVisitedDestinations.map((dest, index) => (
                  <DestinationItem key={`${dest.name}-${index}`}>
                    <div className="destination-name">
                      <MapPin size={16} />
                      {dest.name}
                    </div>
                    <div className="destination-count">
                      {dest.count} {dest.count === 1 ? "viagem" : "viagens"}
                    </div>
                  </DestinationItem>
                ))}
              </DestinationsList>
            </Section>
          )}
        </SectionsGrid>
      </ContentWrapper>
    </DashboardContainer>
  );
};

export default DashboardPage;
