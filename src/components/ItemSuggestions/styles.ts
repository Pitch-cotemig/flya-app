import styled from "styled-components";

export const SuggestionsContainer = styled.div`
  margin-bottom: 2rem;
  animation: fadeIn 1s ease-out 1.8s both;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const SuggestionsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #00bcd4;
`;

export const SuggestionsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

export const SuggestionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

export const SuggestionCard = styled.div`
  background: rgba(0, 188, 212, 0.1);
  border: 1px solid rgba(0, 188, 212, 0.2);
  border-radius: 12px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 188, 212, 0.2);
    border-color: rgba(0, 188, 212, 0.4);
  }
`;

export const SuggestionCategory = styled.div`
  font-size: 0.9rem;
  color: #00bcd4;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const SuggestionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const SuggestionItem = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 0.4rem 0.8rem;
  color: white;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    background: rgba(0, 188, 212, 0.2);
    border-color: rgba(0, 188, 212, 0.4);
    transform: scale(1.05);
  }
`;
