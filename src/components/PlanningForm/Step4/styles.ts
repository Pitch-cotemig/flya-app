import styled from "styled-components";
import { colors } from "../../../design-tokens/colors";

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

export const SubtitleText = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin-bottom: 30px;
  font-weight: 300;
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

export const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 188, 212, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 188, 212, 0.15);
  }

  &.selected {
    background: rgba(0, 188, 212, 0.1);
    border-color: ${colors.primary.cyan};
    box-shadow: 0 8px 30px rgba(0, 188, 212, 0.25);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: ${colors.gradients.primary};
    }

    &::after {
      content: "✓";
      position: absolute;
      top: 12px;
      right: 16px;
      color: ${colors.primary.cyan};
      font-weight: bold;
      font-size: 1.2rem;
    }
  }

  .option-title {
    font-size: 1.1rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 0.25rem;
  }

  .option-description {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.4;
  }
`;

export const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

export const ClimateIcon = styled.span<{ color?: string }>`
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
