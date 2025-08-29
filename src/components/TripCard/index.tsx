import React, { useState } from "react";
import styled from "styled-components";
import { exportToPDF, exportToText } from "../../utils/pdfExport";
import { colors } from "../../design-tokens/colors";

interface CardProps {
  isFavorite?: boolean;
}

interface FavoriteButtonProps {
  isFavorite?: boolean;
}

const Card = styled.div<CardProps>`
  background-color: ${colors.background.primaryAlpha};
  backdrop-filter: blur(12px);
  color: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: ${colors.shadow.card};
  position: relative;
  border: 1px solid ${colors.alpha.white01};
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid ${colors.primary.cyan};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${colors.shadow.cardHover};
    border-color: ${colors.alpha.cyan03};
  }
`;

const CardHeader = styled.div`
  margin-bottom: 16px;
`;

const TripTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px 0;
  background: ${colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const TripDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

const DetailItem = styled.span`
  font-size: 0.875rem;
  color: ${colors.text.muted};
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: "•";
    color: ${colors.primary.cyan};
    font-weight: bold;
  }
`;

const TripSummary = styled.p`
  font-size: 0.875rem;
  color: ${colors.text.mutedDark};
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ViewDetailsButton = styled.button`
  background: ${colors.gradients.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.gradients.cyanHover};
    transform: scale(1.05);
  }
`;

const DeleteButton = styled.button`
  background: ${colors.state.errorGradient};
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(
      135deg,
      ${colors.state.errorDark} 0%,
      #b3300b 100%
    );
    transform: scale(1.1);
  }
`;

const FavoriteButton = styled.button<FavoriteButtonProps>`
  background: ${(props) =>
    props.isFavorite ? "${colors.state.warning}" : "${colors.alpha.white01}"};
  color: ${(props) =>
    props.isFavorite ? "${colors.text.contrast}" : "${colors.text.primary}"};
  border: 2px solid
    ${(props) =>
      props.isFavorite ? "${colors.state.warning}" : "${colors.alpha.cyan03}"};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background: ${(props) =>
      props.isFavorite ? "${colors.state.warning}" : "${colors.alpha.cyan02}"};
    border-color: ${(props) =>
      props.isFavorite ? "${colors.state.warning}" : "${colors.primary.cyan}"};
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.background.overlay};
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: ${colors.background.primaryAlpha};
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 32px;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  width: 100%;
  position: relative;
  border: 1px solid ${colors.alpha.white01};
  box-shadow: ${colors.shadow.modal};
  color: #fff;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  border-bottom: 1px solid ${colors.alpha.white01};
  padding-bottom: 16px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  background: ${colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CloseButton = styled.button`
  background: ${colors.alpha.white01};
  border: 2px solid ${colors.alpha.cyan03};
  color: #fff;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.alpha.cyan02};
    border-color: ${colors.primary.cyan};
    color: ${colors.primary.cyan};
    transform: scale(1.1);
  }
`;

const ModalBody = styled.div`
  margin-bottom: 24px;
`;

const PlanContent = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.6;
  color: ${colors.text.muted};
  background: ${colors.background.glassSoft};
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid ${colors.primary.cyan};
`;

const ExportButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const ExportButton = styled.button`
  padding: 8px 16px;
  border: 2px solid #00bcd4;
  background: transparent;
  color: #00bcd4;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #00bcd4;
    color: white;
    transform: translateY(-2px);
  }
`;

interface TripCardProps {
  trip: {
    id: string;
    plan_result: string;
    is_favorite?: boolean;
    prompt_data?: object;
    ai_prompt?: string;
    created_at?: string;
  };
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const TripCard: React.FC<TripCardProps> = ({
  trip,
  onDelete,
  onToggleFavorite,
}) => {
  const [showModal, setShowModal] = useState(false);

  // Função para extrair informações básicas do plano
  const extractTripInfo = (planResult: string) => {
    const lines = planResult.split("\n");
    let title = "Minha Viagem";
    let destination = "Destino não especificado";
    let dates = "Datas não especificadas";

    // Procurar pelo título
    const titleMatch = lines.find((line) => line.includes("### Título:"));
    if (titleMatch) {
      title = titleMatch.replace("### Título:", "").trim();
    }

    // Procurar por informações de destino no prompt_data se disponível
    if (trip.prompt_data) {
      const promptData = trip.prompt_data as any;
      if (promptData.destino) {
        destination = promptData.destino;
      }
    }

    // Procurar por dias no plano
    const dayMatches = lines.filter((line) => line.includes("**Dia"));
    if (dayMatches.length > 0) {
      dates = `${dayMatches.length} dias de viagem`;
    }

    return { title, destination, dates };
  };

  const tripInfo = extractTripInfo(trip.plan_result);

  const handleExportPDF = () => {
    if (trip.prompt_data && trip.ai_prompt) {
      exportToPDF({
        prompt_data: trip.prompt_data,
        ai_prompt: trip.ai_prompt,
        plan_result: trip.plan_result,
      });
    }
  };

  const handleExportTXT = () => {
    if (trip.prompt_data && trip.ai_prompt) {
      exportToText({
        prompt_data: trip.prompt_data,
        ai_prompt: trip.ai_prompt,
        plan_result: trip.plan_result,
      });
    }
  };

  return (
    <>
      <Card isFavorite={trip.is_favorite} onClick={() => setShowModal(true)}>
        <CardHeader>
          <TripTitle>{tripInfo.title}</TripTitle>
        </CardHeader>

        <TripDetails>
          <DetailItem>📍 {tripInfo.destination}</DetailItem>
          <DetailItem>📅 {tripInfo.dates}</DetailItem>
          {trip.created_at && (
            <DetailItem>
              🗓️ Criada em{" "}
              {new Date(trip.created_at).toLocaleDateString("pt-BR")}
            </DetailItem>
          )}
        </TripDetails>

        <TripSummary>{trip.plan_result.substring(0, 200)}...</TripSummary>

        <CardActions>
          <ViewDetailsButton
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            Ver Detalhes
          </ViewDetailsButton>

          <ActionButtons>
            <FavoriteButton
              isFavorite={trip.is_favorite}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(trip.id);
              }}
            >
              {trip.is_favorite ? "★" : "☆"}
            </FavoriteButton>
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation();
                onDelete(trip.id);
              }}
            >
              ×
            </DeleteButton>
          </ActionButtons>
        </CardActions>
      </Card>

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{tripInfo.title}</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            </ModalHeader>

            <ModalBody>
              <TripDetails>
                <DetailItem>📍 {tripInfo.destination}</DetailItem>
                <DetailItem>📅 {tripInfo.dates}</DetailItem>
                {trip.created_at && (
                  <DetailItem>
                    🗓️ Criada em{" "}
                    {new Date(trip.created_at).toLocaleDateString("pt-BR")}
                  </DetailItem>
                )}
              </TripDetails>

              <PlanContent>{trip.plan_result}</PlanContent>
            </ModalBody>

            {trip.prompt_data && trip.ai_prompt && (
              <ExportButtons>
                <ExportButton onClick={handleExportPDF}>
                  📄 Exportar PDF
                </ExportButton>
                <ExportButton onClick={handleExportTXT}>
                  📝 Exportar TXT
                </ExportButton>
              </ExportButtons>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default TripCard;
