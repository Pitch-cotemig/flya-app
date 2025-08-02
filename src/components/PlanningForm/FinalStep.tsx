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
  text-align: center;
  padding: 40px 0;

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 24px;
    opacity: 0.7;
  }
  
  h1 {
    font-size: 48px;
    margin-bottom: 16px;
    color: #fff;
  }

  p {
    font-size: 18px;
    color: #a9a1d4;
    margin-bottom: 32px;
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
  }
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

const FinalStep: React.FC<FinalStepProps> = ({ tripData, onClose }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleSave = async () => {
    if (!tripData) return;
    setIsSaving(true);
    setSaveMessage(null);
    const response = await tripsService.create(tripData);
    setIsSaving(false);
    if (response.success) {
      setSaveMessage('Viagem salva com sucesso!');
    } else {
      setSaveMessage(response.message);
    }
  };

  const handleExportPDF = () => {
    if (tripData) {
      exportToPDF(tripData);
    }
  };

  const handleExportTXT = () => {
    if (tripData) {
      exportToText(tripData);
    }
  };

  return (
    <FinalScreenContainer>
      <img src={logoPlaceholder} alt="Logo" />
      <h1>Seu Roteiro está Pronto!</h1>
      {tripData?.plan_result ? (
        <PlanResult>{tripData.plan_result}</PlanResult>
      ) : (
        <p>Ocorreu um erro ao gerar seu plano.</p>
      )}
      {saveMessage && <p>{saveMessage}</p>}
      
      <ExportSection>
        <h3>📄 Exportar Roteiro</h3>
        <ButtonContainer>
          <ExportButton onClick={handleExportPDF}>
            📄 Exportar PDF
          </ExportButton>
          <ExportButton onClick={handleExportTXT}>
            📝 Exportar TXT
          </ExportButton>
        </ButtonContainer>
      </ExportSection>

      <ButtonContainer>
        <BackButton onClick={onClose}>Fechar</BackButton>
        <ContinueButton onClick={handleSave} disabled={isSaving || !!saveMessage}>
          {isSaving ? 'Salvando...' : 'Salvar Viagem'}
        </ContinueButton>
      </ButtonContainer>
    </FinalScreenContainer>
  );
};

export default FinalStep; 