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
  padding: 16px 24px;
  border: 2px solid ${colors.primary.cyan};
  background: linear-gradient(
    135deg,
    ${colors.alpha.cyan01} 0%,
    ${colors.alpha.cyan01} 100%
  );
  color: ${colors.primary.cyan};
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  min-width: 140px;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      ${colors.alpha.cyan02},
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    background: ${colors.gradients.primary};
    color: ${colors.neutral.white};
    border-color: ${colors.primary.cyan};
    transform: translateY(-2px) scale(1.02);
    box-shadow: ${colors.shadow.cyanStrong};

    &::before {
      left: 100%;
    }
  }
`;

// Animations
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

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const FinalScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  color: ${colors.text.primary};
  padding: 2rem;
  box-sizing: border-box;
  text-align: center;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 100vh;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;

    animation: ${shimmer} 8s linear infinite;
    pointer-events: none;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: ${colors.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${fadeInUp} 0.8s ease-out;
    position: relative;
    z-index: 2;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 2rem;
  animation: ${fadeInUp} 0.8s ease-out;
  position: relative;
  z-index: 2;

  p {
    font-size: 1.1rem;
    color: ${colors.text.primaryAlpha90};
    margin-top: 0.5rem;
    line-height: 1.6;
  }
`;

const RoteiroContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 2;
  padding: 0 1rem;
  max-width: 1000px;
  margin: 0 auto 2rem auto;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 1.5rem;
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    padding: 0;
  }
`;

const SummaryBlock = styled.div`
  background: ${colors.background.primaryAlpha};
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2rem;
  margin-top: 2rem;
  text-align: left;
  box-shadow: ${colors.shadow.modal}, 0 0 0 1px ${colors.alpha.purple02};
  border: 1px solid ${colors.alpha.purple03};
  animation: ${fadeInUp} 0.8s ease-out;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    border-radius: 24px 24px 0 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${colors.shadow.modalStrong},
      0 0 0 1px ${colors.border.secondaryHover};
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    background: ${colors.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 1.5rem 0;
    border-bottom: 2px solid ${colors.alpha.purple03};
    padding-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 12px;

    &::before {
      content: "📋";
      font-size: 1.2rem;
      animation: ${float} 3s ease-in-out infinite;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 1rem;
    line-height: 1.8;
    color: ${colors.text.primaryAlpha90};
    font-weight: 500;
    padding: 0.75rem 0;
    border-bottom: 1px solid ${colors.alpha.white01};
    animation: ${slideIn} 0.6s ease-out;
    position: relative;
    padding-left: 1.5rem;

    &:last-child {
      border-bottom: none;
    }

    &::before {
      content: "✓";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      color: #7c3aed;
      font-weight: bold;
      font-size: 0.9rem;
    }

    & + li {
      margin-top: 0;
    }
  }
`;

const DayBlock = styled.div`
  background: ${colors.background.primaryAlpha};
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2rem;
  text-align: left;
  box-shadow: ${colors.shadow.modal}, 0 0 0 1px ${colors.alpha.cyan02};
  border: 1px solid ${colors.border.primary};
  animation: ${fadeInUp} 0.8s ease-out;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  word-wrap: break-word;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 12px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${colors.gradients.surface90};
    border-radius: 24px 24px 0 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${colors.shadow.modalStrong},
      0 0 0 1px ${colors.border.primaryHover};
  }
`;

const DayTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  background: ${colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 1.5rem 0;
  border-bottom: 2px solid ${colors.alpha.cyan03};
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: "📅";
    font-size: 1.2rem;
    animation: ${float} 3s ease-in-out infinite;
  }
`;

const PeriodSection = styled.div`
  animation: ${slideIn} 0.6s ease-out;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
  }

  & + & {
    margin-top: 2rem;
  }
`;

const PeriodTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #a9a1d4;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    background: linear-gradient(135deg, #00bcd4 0%, #7c3aed 100%);
    border-radius: 50%;
    animation: ${float} 2s ease-in-out infinite;
  }

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, ${colors.alpha.cyan03}, transparent);
    margin-left: 12px;
  }
`;

const RoteiroItem = styled.div`
  background: linear-gradient(
    135deg,
    ${colors.background.glassStrong} 0%,
    ${colors.background.glassSoft} 100%
  );
  border-radius: 16px;
  padding: 1.25rem 1.75rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid ${colors.alpha.white01};
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 0.6s ease-out;
  word-wrap: break-word;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1rem 1.25rem;
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
    border-radius: 12px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      ${colors.alpha.cyan01},
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px) translateX(4px);
    background: linear-gradient(
      135deg,
      ${colors.alpha.cyan02} 0%,
      ${colors.alpha.purple01} 100%
    );
    border-color: ${colors.alpha.cyan03};
    box-shadow: ${colors.shadow.cyan};

    &::before {
      left: 100%;
    }
  }

  & + & {
    margin-top: 0.75rem;
  }
`;

const ItemContent = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  flex: 1;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
  position: relative;
  z-index: 2;

  &::before {
    content: "🌟";
    margin-right: 8px;
    font-size: 0.8rem;
    opacity: 0.7;
  }
`;

const ItemActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-left: 1rem;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  flex-shrink: 0;

  ${RoteiroItem}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    justify-content: flex-end;
    width: 100%;
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  background: ${colors.alpha.white03};
  border: 1px solid ${colors.alpha.white02};
  border-radius: 12px;
  color: #fff;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  font-size: 0.85rem;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 3;
  min-width: 60px;

  &:hover {
    background: ${colors.alpha.cyan03};
    border-color: ${colors.primary.cyan};
    transform: translateY(-1px);
    box-shadow: ${colors.shadow.cyanStrong};
  }

  &:first-child {
    background: ${colors.alpha.cyan02};

    &:hover {
      background: ${colors.alpha.cyan03};
    }
  }

  &:last-child {
    background: ${colors.alpha.error02};

    &:hover {
      background: ${colors.alpha.error04};
      border-color: ${colors.state.error};
      box-shadow: ${colors.shadow.error};
    }
  }
`;

const FooterActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding: 2rem 0;
  animation: ${fadeInUp} 1s ease-out;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
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

  React.useEffect(() => {
    if (tripData?.plan_result) {
      setPlan(parsePlan(tripData.plan_result));
    }
  }, [tripData]);

  const handleEditItem = (dia: string, periodo: string, index: number) => {
    const novoTexto = prompt("Editar item:", plan.roteiro[dia][periodo][index]);
    if (novoTexto !== null) {
      const novoRoteiro = { ...plan.roteiro };
      novoRoteiro[dia][periodo][index] = novoTexto;
      setPlan((prevPlan) => ({ ...prevPlan, roteiro: novoRoteiro }));
    }
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
    <FinalScreenContainer>
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
                          Editar
                        </ActionButton>
                        <ActionButton
                          onClick={() => handleRemoveItem(dia, periodo, index)}
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
  );
};

export default FinalStep;
