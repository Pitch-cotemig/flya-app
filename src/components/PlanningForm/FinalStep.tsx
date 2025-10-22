import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  ContinueButton,
  BackButton,
} from "../../pages/PlanningFormPage/styles";
import { tripsService } from "../../services/tripsService";
import { exportToPDF, exportToText } from "../../utils/pdfExport";
import { colors } from "../../design-tokens/colors";
import { Edit3, Trash2, X, AlertTriangle } from "lucide-react";
import { useToast } from "../../hooks/useToast";
import { ToastContainer } from "../ToastContainer";

const ExportButton = styled.button`
  padding: 12px 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
  min-width: 120px;
  justify-content: center;

  &:hover {
    color: #00bcd4;
    border-color: rgba(0, 188, 212, 0.3);
    transform: translateY(-2px);
  }
`;

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FinalScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  color: ${colors.text.primary};
  padding: 0;
  margin: 0;
`;

const HeaderSection = styled.div`
  padding: 3rem 2rem 1rem 2rem;
  text-align: center;
  animation: ${fadeInUp} 0.8s ease-out;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem 0.5rem 1.5rem;
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 300;
    margin: 0 0 1rem 0;
    color: rgba(255, 255, 255, 0.95);
    letter-spacing: -0.5px;
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }

  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
    font-weight: 300;
    line-height: 1.5;
    max-width: 600px;
    margin: 0 auto;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const RoteiroContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SummaryBlock = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 2.5rem;
  margin: 3rem 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeInUp} 0.8s ease-out;

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 2rem 0;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.95);
    margin: 0 0 2rem 0;
    text-align: center;

    &::before {
      content: "";
      display: block;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 1rem;
  }

  li {
    font-size: 1rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 300;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border-left: 3px solid ${colors.primary.cyan};
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      transform: translateX(5px);
    }

    &::before {
      content: "";
      margin-right: 10px;
      font-size: 0.9rem;
    }
  }
`;

const DayBlock = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeInUp} 0.8s ease-out;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 2rem;
    margin-bottom: 1.5rem;
  }

  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.03);
  }
`;

const DayTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 2rem 0;
  text-align: center;

  &::before {
    display: block;
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }
`;

const PeriodSection = styled.div`
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PeriodTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 1.5rem 0;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: ${colors.primary.cyan};
    border-radius: 50%;
  }
`;

const RoteiroItem = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    transform: translateX(5px);
  }
`;

const ItemContent = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
  flex: 1;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  position: relative;

  &::before {
    content: "•";
    color: ${colors.primary.cyan};
    font-weight: bold;
    margin-right: 12px;
    font-size: 1.2rem;
  }
`;

const ItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  flex-shrink: 0;

  ${RoteiroItem}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    opacity: 1;
    justify-content: flex-end;
    width: 100%;
  }
`;

const ActionButton = styled.button<{ variant?: "danger" }>`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 400;
  font-size: 0.85rem;
  backdrop-filter: blur(10px);
  min-width: 50px;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
  }

  ${({ variant }) =>
    variant !== "danger" &&
    `
    background: rgba(0, 188, 212, 0.1);
    border-color: rgba(0, 188, 212, 0.2);
    color: #00bcd4;

    &:hover {
      background: rgba(0, 188, 212, 0.2);
      border-color: #00bcd4;
    }
  `}

  ${({ variant }) =>
    variant === "danger" &&
    `
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.2);
    color: #ef4444;

    &:hover {
      background: rgba(239, 68, 68, 0.2);
      border-color: #ef4444;
    }
  `}
`;

// Animações para o modal
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

// Modal Components
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  backdrop-filter: blur(8px);
  animation: ${fadeIn} 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  position: relative;
  background: ${colors.background.primaryAlpha};
  border: 1px solid ${colors.alpha.white01};
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  backdrop-filter: blur(20px);
  box-shadow: ${colors.shadow.modalStrong};
  animation: ${slideIn} 0.3s ease-out;
  
  /* Garantir que o modal não saia da tela em dispositivos pequenos */
  margin: 1rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 95%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${colors.alpha.white01};
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: ${colors.text.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: ${colors.background.glass};
  border: 1px solid ${colors.alpha.white01};
  color: ${colors.text.muted};
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.background.glassStrong};
    color: ${colors.text.primary};
    border-color: ${colors.alpha.cyan02};
  }
`;

const ModalBody = styled.div`
  margin-bottom: 1.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  background: ${colors.background.glassSoft};
  border: 1px solid ${colors.alpha.white01};
  border-radius: 12px;
  padding: 1rem;
  color: ${colors.text.primary};
  font-size: 0.875rem;
  line-height: 1.5;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary.cyan};
    box-shadow: 0 0 0 2px ${colors.alpha.cyan01};
  }

  &::placeholder {
    color: ${colors.text.primaryAlpha60};
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const ModalButton = styled.button<{ variant: "cancel" | "confirm" | "danger" }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  ${({ variant }) => {
    switch (variant) {
      case "cancel":
        return `
          background: ${colors.background.glass};
          color: ${colors.text.muted};
          border: 1px solid ${colors.alpha.white01};
          
          &:hover {
            background: ${colors.background.glassStrong};
            color: ${colors.text.primary};
          }
        `;
      case "confirm":
        return `
          background: ${colors.gradients.primary};
          color: white;
          
          &:hover {
            transform: translateY(-1px);
            box-shadow: ${colors.shadow.cyan};
          }
        `;
      case "danger":
        return `
          background: ${colors.state.errorGradient};
          color: white;
          
          &:hover {
            transform: translateY(-1px);
            box-shadow: ${colors.shadow.error};
          }
        `;
      default:
        return "";
    }
  }}
`;

const ConfirmMessage = styled.p`
  color: ${colors.text.muted};
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
  text-align: center;

  strong {
    color: ${colors.text.primary};
  }
`;

const FooterActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 3rem 2rem;
  animation: ${fadeInUp} 1s ease-out;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    gap: 0.75rem;
  }
`;

interface TripData {
  prompt_data: object;
  ai_prompt: string;
  plan_result: string;
}

interface FinalStepProps {
  tripData: TripData | null;
  onClose: () => void;
  onSaveSuccess?: () => void;
}

interface Roteiro {
  [dia: string]: {
    [periodo: string]: string[];
  };
}

interface ParsedPlan {
  title: string;
  roteiro: Roteiro;
  summary: string[];
}

const parsePlan = (text: string): ParsedPlan => {
  console.log("Raw plan text:", text);
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  const titleMatch = lines.find((line) => line.startsWith("### Título:"));
  const title = titleMatch
    ? titleMatch.replace("### Título:", "").trim()
    : "Seu Roteiro de Viagem";

  const summaryIndex = lines.findIndex((line) =>
    line.startsWith("### Resumo Geral da Viagem")
  );

  const roteiroLines =
    summaryIndex !== -1 ? lines.slice(1, summaryIndex) : lines.slice(1);
  const summaryLines = summaryIndex !== -1 ? lines.slice(summaryIndex + 1) : [];

  console.log("Roteiro lines:", roteiroLines);

  const roteiro: Roteiro = {};
  let currentDay = "";
  let currentPeriod = "";

  roteiroLines.forEach((line, index) => {
    console.log(`Processing line ${index}: "${line}"`);

    // Tenta diferentes padrões para dias
    const dayMatch =
      line.match(/^\s*\*?\*?\s*(Dia\s*\d+[^*]*)\*?\*?/i) ||
      line.match(/^\s*(Dia\s*\d+[^:]*):?/i);

    // Tenta diferentes padrões para períodos
    const periodMatch =
      line.match(/^\s*-?\s*\*?\*?\s*(Manhã|Tarde|Noite)[:\*]*/i) ||
      line.match(/^\s*(Manhã|Tarde|Noite)[:\*]*/i);

    // Verifica atividades
    const activityMatch =
      line.trim().startsWith("*") ||
      line.trim().startsWith("-") ||
      line.trim().startsWith("•");

    console.log(`Day match:`, dayMatch);
    console.log(`Period match:`, periodMatch);
    console.log(`Activity match:`, activityMatch);

    if (dayMatch) {
      currentDay = dayMatch[1].trim();
      roteiro[currentDay] = {};
      currentPeriod = "";
      console.log(`Found day: "${currentDay}"`);
    } else if (periodMatch && currentDay) {
      currentPeriod = periodMatch[1].trim();
      roteiro[currentDay][currentPeriod] = [];
      console.log(`Found period: "${currentPeriod}" for day: "${currentDay}"`);
    } else if (activityMatch && currentDay && currentPeriod) {
      const cleanActivity = line
        .trim()
        .replace(/^[\*\-•]\s*/, "")
        .trim();
      roteiro[currentDay][currentPeriod].push(cleanActivity);
      console.log(`Added activity: "${cleanActivity}"`);
    } else if (line.trim() && currentDay && !periodMatch && !dayMatch) {
      // Se não é período nem dia, pode ser descrição do dia
      if (!currentPeriod) {
        if (!roteiro[currentDay]["Descrição"]) {
          roteiro[currentDay]["Descrição"] = [];
        }
        roteiro[currentDay]["Descrição"].push(line.trim());
        console.log(`Added day description: "${line.trim()}"`);
      } else if (roteiro[currentDay][currentPeriod]?.length > 0) {
        // Adiciona à última atividade
        const lastIndex = roteiro[currentDay][currentPeriod].length - 1;
        roteiro[currentDay][currentPeriod][lastIndex] += ` ${line.trim()}`;
        console.log(`Extended last activity with: "${line.trim()}"`);
      }
    }
  });

  console.log("Final roteiro structure:", roteiro);
  return { title, roteiro, summary: summaryLines };
};

const FinalStep: React.FC<FinalStepProps> = ({
  tripData,
  onClose,
  onSaveSuccess,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [plan, setPlan] = useState<ParsedPlan>({
    title: "",
    roteiro: {},
    summary: [],
  });
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    dia: string;
    periodo: string;
    index: number;
    currentText: string;
  }>({ isOpen: false, dia: "", periodo: "", index: -1, currentText: "" });
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    dia: string;
    periodo: string;
    index: number;
  }>({ isOpen: false, dia: "", periodo: "", index: -1 });
  const [editText, setEditText] = useState("");
  const { toasts, showSuccess, showError, removeToast } = useToast();

  React.useEffect(() => {
    if (tripData?.plan_result) {
      setPlan(parsePlan(tripData.plan_result));
    }
  }, [tripData]);

  // Fechar modais com ESC
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (editModal.isOpen) {
          cancelEdit();
        } else if (deleteModal.isOpen) {
          cancelDelete();
        }
      }
    };

    if (editModal.isOpen || deleteModal.isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevenir scroll da página quando modal estiver aberto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [editModal.isOpen, deleteModal.isOpen]);

  const handleEditItem = (dia: string, periodo: string, index: number) => {
    const currentText = plan.roteiro[dia][periodo][index];
    setEditText(currentText);
    setEditModal({
      isOpen: true,
      dia,
      periodo,
      index,
      currentText,
    });
  };

  const handleRemoveItem = (dia: string, periodo: string, index: number) => {
    setDeleteModal({
      isOpen: true,
      dia,
      periodo,
      index,
    });
  };

  const confirmEdit = () => {
    if (editText.trim()) {
      const novoRoteiro = { ...plan.roteiro };
      novoRoteiro[editModal.dia][editModal.periodo][editModal.index] =
        editText.trim();
      setPlan((prevPlan) => ({ ...prevPlan, roteiro: novoRoteiro }));
    }
    setEditModal({
      isOpen: false,
      dia: "",
      periodo: "",
      index: -1,
      currentText: "",
    });
    setEditText("");
  };

  const confirmDelete = () => {
    const novoRoteiro = { ...plan.roteiro };
    novoRoteiro[deleteModal.dia][deleteModal.periodo] = novoRoteiro[
      deleteModal.dia
    ][deleteModal.periodo].filter((_, i) => i !== deleteModal.index);
    if (novoRoteiro[deleteModal.dia][deleteModal.periodo].length === 0)
      delete novoRoteiro[deleteModal.dia][deleteModal.periodo];
    if (Object.keys(novoRoteiro[deleteModal.dia]).length === 0)
      delete novoRoteiro[deleteModal.dia];
    setPlan((prevPlan) => ({ ...prevPlan, roteiro: novoRoteiro }));
    setDeleteModal({ isOpen: false, dia: "", periodo: "", index: -1 });
  };

  const cancelEdit = () => {
    setEditModal({
      isOpen: false,
      dia: "",
      periodo: "",
      index: -1,
      currentText: "",
    });
    setEditText("");
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, dia: "", periodo: "", index: -1 });
  };

  const stringifyPlan = (planData: ParsedPlan): string => {
    let result = `### Título: ${planData.title}\n\n`;

    for (const dia in planData.roteiro) {
      result += `**${dia}**\n`;
      for (const periodo in planData.roteiro[dia]) {
        result += `- **${periodo}:**\n`;
        planData.roteiro[dia][periodo].forEach((item) => {
          result += `* ${item.replace(/\n/g, "\n  ")}\n`;
        });
      }
      result += "\n";
    }

    result += `### Resumo Geral da Viagem\n`;
    planData.summary.forEach((item) => {
      result += `${item}\n`;
    });

    return result.trim();
  };

  const handleSave = async () => {
    if (!tripData) return;
    const updatedPlanResult = stringifyPlan(plan);
    const updatedTripData = { ...tripData, plan_result: updatedPlanResult };

    setIsSaving(true);
    setSaveMessage(null);
    const response = await tripsService.create(updatedTripData);
    setIsSaving(false);
    if (response.success) {
      setSaveMessage("Viagem salva com sucesso!");
      showSuccess("Viagem salva com sucesso! Você pode visualizá-la em 'Minhas Viagens'.");
      if (onSaveSuccess) {
        onSaveSuccess();
      }
    } else {
      setSaveMessage(response.message);
      showError(response.message || "Erro ao salvar a viagem. Tente novamente.");
    }
  };

  const handleExportPDF = () => {
    if (tripData) {
      const updatedTripData = { ...tripData, plan_result: stringifyPlan(plan) };
      exportToPDF(updatedTripData);
    }
  };

  const handleExportTXT = () => {
    if (tripData) {
      const updatedTripData = { ...tripData, plan_result: stringifyPlan(plan) };
      exportToText(updatedTripData);
    }
  };

  return (
    <FinalScreenContainer>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      <HeaderSection>
        <h1>{plan.title || "Seu Roteiro está Pronto!"}</h1>
        <p>Edite, remova ou adicione itens ao seu roteiro antes de salvar.</p>
      </HeaderSection>

      <RoteiroContainer>
        {Object.keys(plan.roteiro).length > 0 ? (
          Object.keys(plan.roteiro).map((dia) => (
            <DayBlock key={dia}>
              <DayTitle>{dia}</DayTitle>
              {Object.keys(plan.roteiro[dia]).map((periodo) => (
                <PeriodSection key={periodo}>
                  <PeriodTitle>{periodo}</PeriodTitle>
                  {plan.roteiro[dia][periodo].map((item, index) => (
                    <RoteiroItem key={index}>
                      <ItemContent>
                        {item.replace(/^(\*|-)\s*/, "").trim()}
                      </ItemContent>
                      <ItemActions>
                        <ActionButton
                          onClick={() => handleEditItem(dia, periodo, index)}
                        >
                          <Edit3 size={14} />
                          Editar
                        </ActionButton>
                        <ActionButton
                          variant="danger"
                          onClick={() => handleRemoveItem(dia, periodo, index)}
                        >
                          <Trash2 size={14} />
                          Excluir
                        </ActionButton>
                      </ItemActions>
                    </RoteiroItem>
                  ))}
                </PeriodSection>
              ))}
            </DayBlock>
          ))
        ) : (
          <p>Gerando seu roteiro, por favor aguarde...</p>
        )}

        {plan.summary.length > 0 && (
          <SummaryBlock>
            <h2>Resumo Geral da Viagem</h2>
            <ul>
              {plan.summary.map((item, index) => (
                <li key={index}>{item.replace(/^\*/, "").trim()}</li>
              ))}
            </ul>
          </SummaryBlock>
        )}
      </RoteiroContainer>

      {saveMessage && <p>{saveMessage}</p>}

      <FooterActions>
        <ExportButton onClick={handleExportPDF}>Exportar PDF</ExportButton>
        <ExportButton onClick={handleExportTXT}>Exportar TXT</ExportButton>
        <BackButton onClick={onClose}>Fechar</BackButton>
        <ContinueButton
          onClick={handleSave}
          disabled={isSaving || !!saveMessage}
        >
          {isSaving ? "Salvando..." : "Salvar Viagem"}
        </ContinueButton>
      </FooterActions>

      {/* Modal de Edição */}
      {editModal.isOpen && (
        <Modal onClick={cancelEdit}>
          <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Editar Item do Roteiro</ModalTitle>
              <CloseButton onClick={cancelEdit}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <TextArea
                value={editText}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setEditText(e.target.value)
                }
                placeholder="Digite o novo texto para este item..."
                rows={4}
                autoFocus
              />
            </ModalBody>
            <ModalActions>
              <ModalButton variant="cancel" onClick={cancelEdit}>
                Cancelar
              </ModalButton>
              <ModalButton variant="confirm" onClick={confirmEdit}>
                Salvar Alterações
              </ModalButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}

      {/* Modal de Exclusão */}
      {deleteModal.isOpen && (
        <Modal onClick={cancelDelete}>
          <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                <AlertTriangle size={20} color="#ef4444" />
                Confirmar Exclusão
              </ModalTitle>
              <CloseButton onClick={cancelDelete}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <ConfirmMessage>
                Tem certeza que deseja remover este item do roteiro?
                <br />
                <strong>Esta ação não pode ser desfeita.</strong>
              </ConfirmMessage>
            </ModalBody>
            <ModalActions>
              <ModalButton variant="cancel" onClick={cancelDelete}>
                Cancelar
              </ModalButton>
              <ModalButton variant="danger" onClick={confirmDelete}>
                Excluir Item
              </ModalButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
    </FinalScreenContainer>
  );
};

export default FinalStep;
