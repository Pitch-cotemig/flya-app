import React, { useState } from 'react';
import styled from 'styled-components';
import { ContinueButton, BackButton } from '../../pages/PlanningFormPage/styles';
import { tripsService } from '../../services/tripsService';
import { exportToPDF, exportToText } from '../../utils/pdfExport';
import logoPlaceholder from '../../../public/images/logo-placeholder.svg';

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const ExportButton = styled.button`
  padding: 12px 20px;
  border: 2px solid #00bcd4;
  background: transparent;
  color: #00bcd4;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #00bcd4;
    color: white;
  }
`;

const FinalScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #1c1c43;
  color: #fff;
  padding: 2rem;
  box-sizing: border-box;
  z-index: 1000;
  overflow-y: auto;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 2rem;
`;

const RoteiroContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* Espaço entre os dias */
`;

const SummaryBlock = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  text-align: left;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #00bcd4;
    margin: 0 0 1.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 1rem;
    line-height: 1.8;
    & + li {
      margin-top: 0.5rem;
    }
  }
`;

const DayBlock = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: left;
`;

const DayTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #00bcd4;
  margin: 0 0 1.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1rem;
`;

const PeriodSection = styled.div`
  & + & {
    margin-top: 1.5rem;
  }
`;

const PeriodTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #a9a1d4;
  margin: 0 0 1rem 0;
`;

const RoteiroItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  & + & {
    margin-top: 0.5rem;
  }
`;

const ItemContent = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  flex: 1;
`;

const ItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  color: #fff;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const FooterActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PlanResult = styled.pre`
  background-color: #2a215a;
  padding: 20px;
  border-radius: 12px;
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #dcd7ff;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 32px;
`;

const ExportSection = styled.div`
  margin-bottom: 24px;
  
  h3 {
    color: #fff;
    margin-bottom: 16px;
    font-size: 18px;
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
  const lines = text.split('\n').filter(line => line.trim() !== '');
  
  const titleMatch = lines.find(line => line.startsWith('### Título:'));
  const title = titleMatch ? titleMatch.replace('### Título:', '').trim() : 'Seu Roteiro de Viagem';

  const summaryIndex = lines.findIndex(line => line.startsWith('### Resumo Geral da Viagem'));
  
  const roteiroLines = summaryIndex !== -1 ? lines.slice(1, summaryIndex) : lines.slice(1);
  const summaryLines = summaryIndex !== -1 ? lines.slice(summaryIndex + 1) : [];

  const roteiro: Roteiro = {};
  let currentDay = '';
  let currentPeriod = '';

  roteiroLines.forEach(line => {
    const dayMatch = line.match(/^\s*\*\*(Dia\s*\d+.*)\*\*/i);
    const periodMatch = line.match(/^\s*-\s*\*\*(Manhã|Tarde|Noite):\*\*/i);
    const activityMatch = line.trim().startsWith('*');

    if (dayMatch) {
      currentDay = dayMatch[1].trim();
      roteiro[currentDay] = {};
      currentPeriod = '';
    } else if (periodMatch && currentDay) {
      currentPeriod = periodMatch[1].trim();
      roteiro[currentDay][currentPeriod] = [];
    } else if (activityMatch && currentDay && currentPeriod) {
      roteiro[currentDay][currentPeriod].push(line.trim().substring(1).trim());
    } else if (line.trim() && currentDay && currentPeriod && roteiro[currentDay][currentPeriod]?.length > 0) {
      const lastIndex = roteiro[currentDay][currentPeriod].length - 1;
      roteiro[currentDay][currentPeriod][lastIndex] += `\n${line.trim()}`;
    }
  });

  return { title, roteiro, summary: summaryLines };
};

const FinalStep: React.FC<FinalStepProps> = ({ tripData, onClose }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [plan, setPlan] = useState<ParsedPlan>({ title: '', roteiro: {}, summary: [] });

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
      setPlan(prevPlan => ({...prevPlan, roteiro: novoRoteiro}));
    }
  };

  const handleRemoveItem = (dia: string, periodo: string, index: number) => {
    if (window.confirm("Tem certeza que deseja remover este item?")) {
      const novoRoteiro = { ...plan.roteiro };
      novoRoteiro[dia][periodo] = novoRoteiro[dia][periodo].filter((_, i) => i !== index);
      if (novoRoteiro[dia][periodo].length === 0) delete novoRoteiro[dia][periodo];
      if (Object.keys(novoRoteiro[dia]).length === 0) delete novoRoteiro[dia];
      setPlan(prevPlan => ({...prevPlan, roteiro: novoRoteiro}));
    }
  };
  
  const stringifyPlan = (planData: ParsedPlan): string => {
    let result = `### Título: ${planData.title}\n\n`;
    
    for (const dia in planData.roteiro) {
      result += `**${dia}**\n`;
      for (const periodo in planData.roteiro[dia]) {
        result += `- **${periodo}:**\n`;
        planData.roteiro[dia][periodo].forEach(item => {
          result += `* ${item.replace(/\n/g, '\n  ')}\n`;
        });
      }
      result += '\n';
    }
    
    result += `### Resumo Geral da Viagem\n`;
    planData.summary.forEach(item => {
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
      setSaveMessage('Viagem salva com sucesso!');
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
        <h1>{plan.title || 'Seu Roteiro está Pronto!'}</h1>
        <p>Edite, remova ou adicione itens ao seu roteiro antes de salvar.</p>
      </HeaderSection>
      
      <RoteiroContainer>
        {Object.keys(plan.roteiro).length > 0 ? (
          Object.keys(plan.roteiro).map(dia => (
            <DayBlock key={dia}>
              <DayTitle>{dia}</DayTitle>
              {Object.keys(plan.roteiro[dia]).map(periodo => (
                <PeriodSection key={periodo}>
                  <PeriodTitle>{periodo}</PeriodTitle>
                  {plan.roteiro[dia][periodo].map((item, index) => (
                    <RoteiroItem key={index}>
                      <ItemContent>{item.replace(/^(\*|-)\s*/, '').trim()}</ItemContent>
                      <ItemActions>
                        <ActionButton onClick={() => handleEditItem(dia, periodo, index)}>Editar</ActionButton>
                        <ActionButton onClick={() => handleRemoveItem(dia, periodo, index)}>Excluir</ActionButton>
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
                        <li key={index}>{item.replace(/^\*/, '').trim()}</li>
                    ))}
                </ul>
            </SummaryBlock>
        )}
      </RoteiroContainer>

      {saveMessage && <p>{saveMessage}</p>}
      
      <FooterActions>
        <ExportButton onClick={handleExportPDF}>
          Exportar PDF
        </ExportButton>
        <ExportButton onClick={handleExportTXT}>
          Exportar TXT
        </ExportButton>
        <BackButton onClick={onClose}>Fechar</BackButton>
        <ContinueButton onClick={handleSave} disabled={isSaving || !!saveMessage}>
          {isSaving ? 'Salvando...' : 'Salvar Viagem'}
        </ContinueButton>
      </FooterActions>
    </FinalScreenContainer>
  );
};

export default FinalStep; 