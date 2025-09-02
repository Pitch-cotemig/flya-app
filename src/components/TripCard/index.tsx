import React, { useState } from "react";
import { exportToPDF, exportToText } from "../../utils/pdfExport";
import {
  Card,
  CardHeader,
  TripTitle,
  TripDetails,
  DetailItem,
  TripSummary,
  CardActions,
  ActionButtons,
  ViewDetailsButton,
  IconButton,
  FavoriteButton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  PlanContent,
  ExportButtons,
  ExportButton,
  ConfirmModal,
  ConfirmContent,
  ConfirmTitle,
  ConfirmMessage,
  ConfirmActions,
  ConfirmButton,
} from "./styles";

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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const extractTripInfo = (planResult: string) => {
    const lines = planResult.split("\n");
    let title = "Minha Viagem";
    let destination = "Destino não especificado";
    let dates = "Datas não especificadas";

    const titleMatch = lines.find((line) => line.includes("### Título:"));
    if (titleMatch) {
      title = titleMatch.replace("### Título:", "").trim();
    }

    if (trip.prompt_data) {
      const promptData = trip.prompt_data as any;
      if (promptData.destino) {
        destination = promptData.destino;
      }
    }

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

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(trip.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <Card isFavorite={trip.is_favorite} onClick={() => setShowModal(true)}>
        <CardHeader>
          <TripTitle>{tripInfo.title}</TripTitle>
        </CardHeader>

        <TripDetails>
          <DetailItem>
            <span className="icon">📍</span>
            {tripInfo.destination}
          </DetailItem>
          <DetailItem>
            <span className="icon">⏳</span>
            {tripInfo.dates}
          </DetailItem>
          {trip.created_at && (
            <DetailItem>
              <span className="icon">🗓️</span>
              Criada em {new Date(trip.created_at).toLocaleDateString("pt-BR")}
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
              {trip.is_favorite ? "⭐" : "☆"}
            </FavoriteButton>
            <IconButton
              variant="danger"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick();
              }}
            >
              ×
            </IconButton>
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
                <DetailItem>
                  <span className="icon">📍</span>
                  {tripInfo.destination}
                </DetailItem>
                <DetailItem>
                  <span className="icon">📅</span>
                  {tripInfo.dates}
                </DetailItem>
                {trip.created_at && (
                  <DetailItem>
                    <span className="icon">🗓️</span>
                    Criada em{" "}
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

      {showDeleteConfirm && (
        <ConfirmModal onClick={handleCancelDelete}>
          <ConfirmContent onClick={(e) => e.stopPropagation()}>
            <ConfirmTitle>⚠️ Confirmar Exclusão</ConfirmTitle>
            <ConfirmMessage>
              Tem certeza que deseja excluir este roteiro de viagem?
              <br />
              <strong>Esta ação não pode ser desfeita.</strong>
            </ConfirmMessage>
            <ConfirmActions>
              <ConfirmButton variant="cancel" onClick={handleCancelDelete}>
                Cancelar
              </ConfirmButton>
              <ConfirmButton variant="danger" onClick={handleConfirmDelete}>
                Excluir
              </ConfirmButton>
            </ConfirmActions>
          </ConfirmContent>
        </ConfirmModal>
      )}
    </>
  );
};

export default TripCard;
