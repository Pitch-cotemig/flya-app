export const StepContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`;

export const QuestionTitle = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 400;
  text-align: center;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.3;

  .emoji {
    margin-left: 0.5rem;
    font-size: 1.2em;
  }
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

import styled from "styled-components";

export const PetIcon = styled.span`
  font-size: 28px;
  transition: all 0.3s ease;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
`;

export const BudgetIcon = styled.span<{ color?: string }>`
  font-size: 28px;
  transition: all 0.3s ease;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  filter: ${(props) =>
    props.color ? `drop-shadow(0 0 8px ${props.color})` : "none"};
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

export const TextContainer = styled.div`
  flex: 1;
`;

export const RadioInput = styled.input.attrs({ type: "radio" })`
  display: none;
`;

export const SectionDivider = styled.div`
  margin: 2.5rem 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%
  );
`;
