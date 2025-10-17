import { MapPin, Calendar, Package, Plus } from "lucide-react";
import { TripForBag } from "../../services/bagsService";
import {
  TripSelectionContainer,
  TripSelectionHeader,
  TripSelectionTitle,
  TripSelectionSubtitle,
  TripsGrid,
  TripCard,
  TripImage,
  TripInfo,
  TripDestination,
  TripDuration,
  TripMeta,
  TripActions,
  SelectTripButton,
  BagStatus,
  EmptyState,
  EmptyIcon,
  EmptyText,
} from "./TripSelection.styles";

interface TripSelectionProps {
  trips: TripForBag[];
  onSelectTrip: (trip: TripForBag) => void;
  loading?: boolean;
}

export function TripSelection({
  trips,
  onSelectTrip,
  loading = false,
}: TripSelectionProps) {
  const formatDuration = (days: number) => {
    if (days === 1) return "1 dia";
    return `${days} dias`;
  };

  const extractDestination = (planResult: string): string => {
    // Tentar extrair o destino do planResult
    const lines = planResult.split("\\n");
    const destinationLine = lines.find(
      (line) =>
        line.toLowerCase().includes("destino") ||
        line.toLowerCase().includes("destination") ||
        line.startsWith("# ")
    );

    if (destinationLine) {
      return destinationLine
        .replace(/^#+\\s*/, "")
        .replace(/destino:?\\s*/i, "")
        .trim();
    }

    return "Destino não especificado";
  };

  if (loading) {
    return (
      <TripSelectionContainer>
        <TripSelectionHeader>
          <TripSelectionTitle>
            <Package size={32} />
            Carregando suas viagens...
          </TripSelectionTitle>
        </TripSelectionHeader>
      </TripSelectionContainer>
    );
  }

  if (trips.length === 0) {
    return (
      <TripSelectionContainer>
        <TripSelectionHeader>
          <TripSelectionTitle>
            <Package size={32} />
            Minha Mala
          </TripSelectionTitle>
          <TripSelectionSubtitle>
            Você ainda não possui viagens salvas
          </TripSelectionSubtitle>
        </TripSelectionHeader>

        <EmptyState>
          <EmptyIcon>
            <MapPin size={64} />
          </EmptyIcon>
          <EmptyText>
            Primeiro você precisa criar e salvar uma viagem para poder fazer sua
            mala personalizada.
            <br />
            Vá para "Planejamento" e crie sua primeira viagem!
          </EmptyText>
        </EmptyState>
      </TripSelectionContainer>
    );
  }

  return (
    <TripSelectionContainer>
      <TripSelectionHeader>
        <TripSelectionTitle>
          <Package size={32} />
          Minha Mala
        </TripSelectionTitle>
        <TripSelectionSubtitle>
          Selecione uma viagem para organizar sua bagagem
        </TripSelectionSubtitle>
      </TripSelectionHeader>

      <TripsGrid>
        {trips.map((trip) => (
          <TripCard key={trip.id}>
            <TripImage>
              <MapPin size={24} />
            </TripImage>

            <TripInfo>
              <TripDestination>
                {trip.destination || extractDestination(trip.planResult)}
              </TripDestination>

              <TripMeta>
                <TripDuration>
                  <Calendar size={16} />
                  {formatDuration(trip.duration)}
                </TripDuration>

                <BagStatus hasBag={trip.hasBag}>
                  <Package size={16} />
                  {trip.hasBag ? "Mala criada" : "Sem mala"}
                </BagStatus>
              </TripMeta>
            </TripInfo>

            <TripActions>
              <SelectTripButton onClick={() => onSelectTrip(trip)}>
                {trip.hasBag ? (
                  <>
                    <Package size={18} />
                    Ver Mala
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Fazer Mala
                  </>
                )}
              </SelectTripButton>
            </TripActions>
          </TripCard>
        ))}
      </TripsGrid>
    </TripSelectionContainer>
  );
}
