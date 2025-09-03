import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  ContinueButton,
  BackButton,
} from "../../pages/PlanningFormPage/styles";
import { tripsService } from "../../services/tripsService";
import { exportToPDF, exportToText } from "../../utils/pdfExport";
import { colors } from "../../design-tokens/colors";

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
    background: rgba(0, 188, 212, 0.1);
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
  background: rgba(13, 16, 32, 0.95);
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
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
      color: ${colors.primary.cyan};
      transform: translateY(-2px);
    }

    &:hover::after {
      content: " ✏️";
      font-size: 1.5rem;
      opacity: 0.7;
    }

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
      content: "📋";
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
      content: "✨";
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
    content: "📅";
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

const ActionButton = styled.button`
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

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
  }

  &:first-child {
    background: rgba(0, 188, 212, 0.1);
    border-color: rgba(0, 188, 212, 0.2);
    color: #00bcd4;

    &:hover {
      background: rgba(0, 188, 212, 0.2);
      border-color: #00bcd4;
    }
  }

  &:last-child {
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.2);
    color: #ef4444;

    &:hover {
      background: rgba(239, 68, 68, 0.2);
      border-color: #ef4444;
    }
  }
`;

// Modal de Edição
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 1000;
  animation: ${fadeInUp} 0.3s ease-out;
  overflow-y: auto;
`;

const ModalContainer = styled.div`
  background: rgba(13, 16, 32, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: calc(100% - 4rem);
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  position: absolute;
  animation: ${fadeInUp} 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem;
    max-width: none;
    max-height: 90vh;
    width: calc(100% - 2rem);
    left: 1rem !important;
    top: 1rem !important;
  }
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h3 {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.95);
    margin: 0 0 0.5rem 0;
    font-weight: 400;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
    font-size: 0.9rem;
  }
`;

const EditTextarea = styled.textarea<{ isTitle?: boolean }>`
  width: 100%;
  min-height: ${(props) => (props.isTitle ? "80px" : "200px")};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: ${(props) => (props.isTitle ? "1.2rem" : "1rem")};
  font-family: inherit;
  font-weight: ${(props) => (props.isTitle ? "500" : "400")};
  line-height: 1.6;
  resize: vertical;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  text-align: ${(props) => (props.isTitle ? "center" : "left")};

  &:focus {
    outline: none;
    border-color: ${colors.primary.cyan};
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const ModalButton = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.75rem 1.5rem;
  border: 1px solid
    ${(props) =>
      props.variant === "primary"
        ? "rgba(0, 188, 212, 0.3)"
        : "rgba(255, 255, 255, 0.2)"};
  background: ${(props) =>
    props.variant === "primary"
      ? "rgba(0, 188, 212, 0.1)"
      : "rgba(255, 255, 255, 0.05)"};
  color: ${(props) =>
    props.variant === "primary" ? "#00bcd4" : "rgba(255, 255, 255, 0.8)"};
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  min-width: 100px;

  &:hover {
    background: ${(props) =>
      props.variant === "primary"
        ? "rgba(0, 188, 212, 0.2)"
        : "rgba(255, 255, 255, 0.1)"};
    border-color: ${(props) =>
      props.variant === "primary" ? "#00bcd4" : "rgba(255, 255, 255, 0.3)"};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
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

  // Estados do modal de edição
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    text: string;
    dia: string;
    periodo: string;
    index: number;
    isTitle?: boolean;
    clickPosition?: { x: number; y: number };
  }>({
    isOpen: false,
    text: "",
    dia: "",
    periodo: "",
    index: -1,
    isTitle: false,
    clickPosition: undefined,
  });

  React.useEffect(() => {
    if (tripData?.plan_result) {
      setPlan(parsePlan(tripData.plan_result));
    }
  }, [tripData]);

  const getModalPosition = () => {
    if (!editModal.clickPosition)
      return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    const { x, y } = editModal.clickPosition;
    const modalWidth = 600;
    const modalHeight = 400;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Calcular posição ideal
    let left = Math.max(
      32,
      Math.min(x - modalWidth / 2, viewportWidth - modalWidth - 32)
    );
    let top = Math.max(32, y - scrollTop - 100); // 100px acima do clique, ajustado pelo scroll

    // Ajustar se sair da viewport
    if (top + modalHeight > viewportHeight - 32) {
      top = Math.max(32, viewportHeight - modalHeight - 32);
    }

    return {
      top: `${top}px`,
      left: `${left}px`,
      transform: "none",
    };
  };
  React.useEffect(() => {
    if (editModal.isOpen) {
      document.body.style.overflow = "hidden";

      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleCancelEdit();
        }
      };

      document.addEventListener("keydown", handleKeyPress);

      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [editModal.isOpen]);

  const handleEditTitle = (event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    setEditModal({
      isOpen: true,
      text: plan.title,
      dia: "",
      periodo: "",
      index: -1,
      isTitle: true,
      clickPosition: {
        x: rect.left + rect.width / 2,
        y: rect.top + scrollTop,
      },
    });
  };

  const handleEditItem = (
    dia: string,
    periodo: string,
    index: number,
    event: React.MouseEvent
  ) => {
    const currentText = plan.roteiro[dia][periodo][index];
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    setEditModal({
      isOpen: true,
      text: currentText,
      dia,
      periodo,
      index,
      isTitle: false,
      clickPosition: {
        x: rect.left + rect.width / 2,
        y: rect.top + scrollTop,
      },
    });
  };

  const handleSaveEdit = () => {
    const { dia, periodo, index, text, isTitle } = editModal;
    if (text.trim()) {
      if (isTitle) {
        setPlan((prevPlan) => ({ ...prevPlan, title: text.trim() }));
      } else {
        const novoRoteiro = { ...plan.roteiro };
        novoRoteiro[dia][periodo][index] = text.trim();
        setPlan((prevPlan) => ({ ...prevPlan, roteiro: novoRoteiro }));
      }
    }
    setEditModal({
      isOpen: false,
      text: "",
      dia: "",
      periodo: "",
      index: -1,
      isTitle: false,
      clickPosition: undefined,
    });
  };

  const handleCancelEdit = () => {
    setEditModal({
      isOpen: false,
      text: "",
      dia: "",
      periodo: "",
      index: -1,
      isTitle: false,
      clickPosition: undefined,
    });
  };

  const handleRemoveItem = (dia: string, periodo: string, index: number) => {
    if (window.confirm("Tem certeza que deseja remover este item?")) {
      const novoRoteiro = { ...plan.roteiro };
      novoRoteiro[dia][periodo] = novoRoteiro[dia][periodo].filter(
        (_, i) => i !== index
      );
      if (novoRoteiro[dia][periodo].length === 0)
        delete novoRoteiro[dia][periodo];
      if (Object.keys(novoRoteiro[dia]).length === 0) delete novoRoteiro[dia];
      setPlan((prevPlan) => ({ ...prevPlan, roteiro: novoRoteiro }));
    }
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
      if (onSaveSuccess) {
        onSaveSuccess();
      }
    } else {
      setSaveMessage(response.message);
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
    <>
      <FinalScreenContainer>
        <HeaderSection>
          <h1 onClick={handleEditTitle}>
            {plan.title || "Seu Roteiro está Pronto!"}
          </h1>
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
                            onClick={(e) =>
                              handleEditItem(dia, periodo, index, e)
                            }
                          >
                            Editar
                          </ActionButton>
                          <ActionButton
                            onClick={() =>
                              handleRemoveItem(dia, periodo, index)
                            }
                          >
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
      </FinalScreenContainer>

      {/* Modal de Edição */}
      {editModal.isOpen && (
        <ModalOverlay
          onClick={handleCancelEdit}
          onScroll={(e) => e.preventDefault()}
        >
          <ModalContainer
            style={getModalPosition()}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <h3>
                {editModal.isTitle ? "📝 Editar Título" : "✏️ Editar Item"}
              </h3>
              <p>
                {editModal.isTitle
                  ? "Defina um título marcante para sua viagem"
                  : "Faça as alterações necessárias no texto abaixo"}
              </p>
            </ModalHeader>

            <EditTextarea
              isTitle={editModal.isTitle}
              value={editModal.text}
              onChange={(e) =>
                setEditModal((prev) => ({ ...prev, text: e.target.value }))
              }
              placeholder={
                editModal.isTitle
                  ? "Ex: Aventura Épica pelo Brasil"
                  : "Digite o texto do item aqui..."
              }
              ref={(textarea) => {
                if (textarea && editModal.isOpen) {
                  setTimeout(() => {
                    textarea.focus();
                    textarea.setSelectionRange(
                      textarea.value.length,
                      textarea.value.length
                    );
                  }, 100);
                }
              }}
            />

            <ModalActions>
              <ModalButton variant="secondary" onClick={handleCancelEdit}>
                Cancelar
              </ModalButton>
              <ModalButton variant="primary" onClick={handleSaveEdit}>
                Salvar Alterações
              </ModalButton>
            </ModalActions>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default FinalStep;
