import React from 'react';
import styled from 'styled-components';
import { exportToPDF, exportToText } from '../../utils/pdfExport';

interface CardProps {
  isFavorite?: boolean;
}

interface FavoriteButtonProps {
  isFavorite?: boolean;
}

const Card = styled.div<CardProps>`
  background-color: #fff;
  color: #333;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  position: relative;
  border: 2px solid ${props => props.isFavorite ? '#ffd700' : 'transparent'};
`;

const PlanContent = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-weight: bold;
`;

const FavoriteButton = styled.button<FavoriteButtonProps>`
  position: absolute;
  top: 16px;
  right: 56px;
  background: ${props => props.isFavorite ? '#ffd700' : '#f0f0f0'};
  color: ${props => props.isFavorite ? '#333' : '#666'};
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ExportButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const ExportButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #00bcd4;
  background: transparent;
  color: #00bcd4;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #00bcd4;
    color: white;
  }
`;

interface TripCardProps {
  trip: { 
    id: string; 
    plan_result: string; 
    is_favorite?: boolean;
    prompt_data?: object;
    ai_prompt?: string;
  };
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onDelete, onToggleFavorite }) => {
  const handleExportPDF = () => {
    if (trip.prompt_data && trip.ai_prompt) {
      exportToPDF({
        prompt_data: trip.prompt_data,
        ai_prompt: trip.ai_prompt,
        plan_result: trip.plan_result
      });
    }
  };

  const handleExportTXT = () => {
    if (trip.prompt_data && trip.ai_prompt) {
      exportToText({
        prompt_data: trip.prompt_data,
        ai_prompt: trip.ai_prompt,
        plan_result: trip.plan_result
      });
    }
  };

  return (
    <Card isFavorite={trip.is_favorite}>
      <DeleteButton onClick={() => onDelete(trip.id)}>&times;</DeleteButton>
      <FavoriteButton 
        isFavorite={trip.is_favorite} 
        onClick={() => onToggleFavorite(trip.id)}
      >
        {trip.is_favorite ? '★' : '☆'}
      </FavoriteButton>
      <PlanContent>{trip.plan_result}</PlanContent>
      
      {trip.prompt_data && trip.ai_prompt && (
        <ExportButtons>
          <ExportButton onClick={handleExportPDF}>
            📄 PDF
          </ExportButton>
          <ExportButton onClick={handleExportTXT}>
            📝 TXT
          </ExportButton>
        </ExportButtons>
      )}
    </Card>
  );
};

export default TripCard; 