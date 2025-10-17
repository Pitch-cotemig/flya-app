import React, { useState } from "react";
import { exportToPDF, exportToText } from "../../utils/pdfExport";
import {
  MapPin,
  Clock,
  Calendar,
  Star,
  X,
  FileText,
  Download,
  AlertTriangle,
} from "lucide-react";
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

// Função para formatar texto no preview (sem dias destacados)
const formatTextPreview = (text: string) => {
  return (
    text
      // Títulos com ###
      .replace(
        /### (.*?)(?=\n|$)/g,
        '<h3 style="color: #00d4ff; font-size: 1.25rem; font-weight: 600; margin: 20px 0 12px 0;">$1</h3>'
      )
      // Negrito com **texto**
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong style="color: #ffffff; font-weight: 600;">$1</strong>'
      )
      // Asteriscos simples viram bullets
      .replace(/^\* (.*?)$/gm, "• $1")
      // Hífens viram bullets
      .replace(/^- (.*?)$/gm, "• $1")
  );
};

// Função para formatar texto completo no modal (com dias destacados)
const formatTextWithBold = (text: string) => {
  return (
    text
      // Títulos com ###
      .replace(
        /### (.*?)(?=\n|$)/g,
        '<h3 style="color: #00d4ff; font-size: 1.25rem; font-weight: 600; margin: 20px 0 12px 0;">$1</h3>'
      )
      // Dias como subtítulos (Dia X: ...)
      .replace(
        /^(Dia \d+:.*?)$/gm,
        '<h4 style="color: #ffffff; font-size: 1.1rem; font-weight: 600; margin: 16px 0 8px 0;">$1</h4>'
      )
      // Negrito com **texto**
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong style="color: #ffffff; font-weight: 600;">$1</strong>'
      )
      // Asteriscos simples viram bullets
      .replace(/^\* (.*?)$/gm, "• $1")
      // Hífens viram bullets
      .replace(/^- (.*?)$/gm, "• $1")
  );
};

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
            <MapPin size={16} className="icon" />
            {tripInfo.destination}
          </DetailItem>
          <DetailItem>
            <Clock size={16} className="icon" />
            {tripInfo.dates}
          </DetailItem>
          {trip.created_at && (
            <DetailItem>
              <Calendar size={16} className="icon" />
              Criada em {new Date(trip.created_at).toLocaleDateString("pt-BR")}
            </DetailItem>
          )}
        </TripDetails>

        <TripSummary
          dangerouslySetInnerHTML={{
            __html:
              formatTextPreview(trip.plan_result.substring(0, 200)) + "...",
          }}
        />

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
              <Star
                size={16}
                fill={trip.is_favorite ? "currentColor" : "none"}
              />
            </FavoriteButton>
            <IconButton
              variant="danger"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick();
              }}
            >
              <X size={16} />
            </IconButton>
          </ActionButtons>
        </CardActions>
      </Card>

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{tripInfo.title}</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              <TripDetails>
                <DetailItem>
                  <MapPin size={16} className="icon" />
                  {tripInfo.destination}
                </DetailItem>
                <DetailItem>
                  <Clock size={16} className="icon" />
                  {tripInfo.dates}
                </DetailItem>
                {trip.created_at && (
                  <DetailItem>
                    <Calendar size={16} className="icon" />
                    Criada em{" "}
                    {new Date(trip.created_at).toLocaleDateString("pt-BR")}
                  </DetailItem>
                )}
              </TripDetails>

              <PlanContent
                dangerouslySetInnerHTML={{
                  __html: formatTextWithBold(trip.plan_result).replace(
                    /\n/g,
                    "<br/>"
                  ),
                }}
              />
            </ModalBody>

            {trip.prompt_data && trip.ai_prompt && (
              <ExportButtons>
                <ExportButton onClick={handleExportPDF}>
                  <Download size={16} />
                  Exportar PDF
                </ExportButton>
                <ExportButton onClick={handleExportTXT}>
                  <FileText size={16} />
                  Exportar TXT
                </ExportButton>
              </ExportButtons>
            )}
          </ModalContent>
        </Modal>
      )}

      {showDeleteConfirm && (
        <ConfirmModal onClick={handleCancelDelete}>
          <ConfirmContent onClick={(e) => e.stopPropagation()}>
            <ConfirmTitle>
              <AlertTriangle size={20} />
              Confirmar Exclusão
            </ConfirmTitle>
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
