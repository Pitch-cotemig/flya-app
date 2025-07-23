import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
`;

const ModalTitle = styled.h2`
  color: #333;
  margin-bottom: 16px;
`;

const ModalButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #218838;
  }
`;

interface SuccessModalProps {
  title: string;
  onConfirm: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ title, onConfirm }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalButton onClick={onConfirm}>Ok!</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SuccessModal; 