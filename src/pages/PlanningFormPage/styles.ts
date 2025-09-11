import styled, { keyframes, css } from "styled-components";
import { colors } from "../../design-tokens/colors";

// Animações
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

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const magicSparkle = keyframes`
  0%, 100% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
`;

const travelPath = keyframes`
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    transform: translateX(100px);
    opacity: 0;
  }
`;

const breathe = keyframes`
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
`;

const gradientShift = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
`;

const cardHover = keyframes`
  0% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-2px) scale(1.02);
  }
  100% {
    transform: translateY(-4px) scale(1.03);
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 0 4px 20px rgba(0, 188, 212, 0.1);
  }
  50% {
    box-shadow: 0 8px 30px rgba(0, 188, 212, 0.3), 0 0 20px rgba(124, 58, 237, 0.2);
  }
`;

const iconBounce = keyframes`
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.1) rotate(-5deg);
  }
  75% {
    transform: scale(1.1) rotate(5deg);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const backgroundShine = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
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

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  text-align: center;

  .loading-icon {
    font-size: 80px;
    margin-bottom: 24px;
    animation: ${travelPath} 3s ease-in-out infinite;
  }

  .loading-title {
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 700;
    margin-bottom: 16px;
    color: white;
  }

  .loading-subtitle {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 32px;
    line-height: 1.6;
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top: 4px solid #00bcd4;
    border-radius: 50%;
    animation: ${spin} 1.5s linear infinite;
    margin-bottom: 32px;
  }

  .loading-steps {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 350px;

    .step {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;

      &.completed {
        background: rgba(0, 188, 212, 0.1);
        border-color: rgba(0, 188, 212, 0.3);
      }

      &.active {
        background: rgba(124, 58, 237, 0.1);
        border-color: rgba(124, 58, 237, 0.3);
      }

      .step-icon {
        font-size: 20px;
        min-width: 20px;
      }

      .step-text {
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 400;
        line-height: 1.4;
      }
    }
  }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(28, 28, 67) 100%);
`;

export const FloatingElements = styled.div`
  display: none;
`;

export const DecorativeElements = styled.div`
  display: none;
`;

export const FormContainer = styled.div`
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  width: 100%;
  max-width: 1050px;
  margin: 2rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${colors.text.primary};

  @media (max-width: 768px) {
    padding: 20px;
    margin: 1rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${colors.alpha.white01};
  border: 2px solid ${colors.alpha.cyan03};
  color: ${colors.text.primary};
  font-size: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  z-index: 10;

  &:hover {
    background: ${colors.primary.cyan};
    color: white;
    border-color: ${colors.primary.cyan};
    transform: scale(1.1) rotate(90deg);
  }
`;

export const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 1rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

export const StepDot = styled.div<{ $active?: boolean; $completed?: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${(props) =>
    props.$completed
      ? "#00bcd4"
      : props.$active
      ? "#7c3aed"
      : "rgba(255, 255, 255, 0.3)"};
  transition: all 0.3s ease;

  ${(props) =>
    props.$active &&
    css`
      transform: scale(1.2);
    `}
`;

export const StepLine = styled.div<{ $completed?: boolean }>`
  height: 3px;
  background: ${(props) =>
    props.$completed ? "#00bcd4" : "rgba(255, 255, 255, 0.2)"};
  transition: all 0.3s ease;
  flex: 1;
  max-width: 50px;
  border-radius: 4px;
`;

export const StepText = styled.span`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  margin-left: 1rem;
`;

export const QuestionTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  color: white;
  line-height: 1.2;

  .emoji {
    display: inline-block;
    margin-left: 0.5rem;
  }
`;

export const OptionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.2rem;
  }

  & > * {
    animation: ${slideInLeft} 0.6s ease-out forwards;
    opacity: 0;
    transform: translateX(-20px);
  }

  & > *:nth-child(1) {
    animation-delay: 0.1s;
  }
  & > *:nth-child(2) {
    animation-delay: 0.2s;
  }
  & > *:nth-child(3) {
    animation-delay: 0.3s;
  }
  & > *:nth-child(4) {
    animation-delay: 0.4s;
  }
`;

export const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(15px) saturate(180%);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  opacity: 1;
  transform: translateY(0);

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
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.6s ease;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 188, 212, 0.3) 50%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .option-title {
    font-weight: 600;
    margin-bottom: 6px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.95);
    transition: all 0.3s ease;
  }

  .option-description {
    font-size: 13px;
    opacity: 0.7;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s ease;
    line-height: 1.4;
  }

  span {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-block;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(0, 188, 212, 0.1) 0%,
      rgba(124, 58, 237, 0.05) 100%
    );
    border-color: rgba(0, 188, 212, 0.4);
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 188, 212, 0.2);

    &::before {
      left: 100%;
    }

    &::after {
      opacity: 1;
    }

    span {
      transform: scale(1.1) rotate(5deg);
      filter: drop-shadow(0 4px 8px rgba(0, 188, 212, 0.3));
    }

    .option-title {
      color: rgba(0, 188, 212, 0.9);
      transform: translateX(4px);
    }

    .option-description {
      opacity: 0.9;
      color: rgba(255, 255, 255, 0.8);
      transform: translateX(4px);
    }
  }

  &.selected {
    background: linear-gradient(
      135deg,
      rgba(0, 188, 212, 0.2) 0%,
      rgba(124, 58, 237, 0.1) 100%
    );
    border-color: rgba(0, 188, 212, 0.6);
    color: white;
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 8px 25px rgba(0, 188, 212, 0.3),
      0 4px 15px rgba(124, 58, 237, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);

    &::after {
      opacity: 1;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(0, 188, 212, 0.8) 50%,
        transparent 100%
      );
    }

    span {
      transform: scale(1.15);
      filter: drop-shadow(0 0 12px rgba(0, 188, 212, 0.6));
    }

    .option-title {
      color: rgba(255, 255, 255, 1);
      font-weight: 700;
    }

    .option-description {
      opacity: 1;
      color: rgba(255, 255, 255, 0.9);
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
    transition: all 0.1s ease;
  }
`;

export const StepContainer = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.03) 100%
  );
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 188, 212, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: ${fadeInUp} 0.8s ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      #00bcd4 20%,
      #7c3aed 50%,
      #00bcd4 80%,
      transparent 100%
    );
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem;
  }
`;

export const RadioInput = styled.input.attrs({ type: "radio" })`
  margin-right: 1.2rem;
  width: 24px;
  height: 24px;
  accent-color: #00bcd4;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:checked {
    transform: scale(1.15);
    filter: drop-shadow(0 0 12px rgba(0, 188, 212, 0.8));
    animation: ${pulse} 1.5s ease-in-out infinite;
  }

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 6px rgba(0, 188, 212, 0.4));
  }

  &:focus {
    outline: 2px solid rgba(0, 188, 212, 0.5);
    outline-offset: 2px;
  }
`;

export const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
  margin-right: 1rem;
  width: 22px;
  height: 22px;
  accent-color: #7c3aed;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:checked {
    transform: scale(1.1);
    filter: drop-shadow(0 0 8px rgba(124, 58, 237, 0.6));
    animation: ${pulse} 1.5s ease-in-out infinite;
  }

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 6px rgba(124, 58, 237, 0.4));
  }
`;

export const OptionIcon = styled.span`
  font-size: 28px !important;
  margin-right: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));

  ${OptionLabel}:hover & {
    transform: scale(1.1) rotate(5deg);
    animation: ${iconBounce} 0.6s ease-in-out;
    filter: drop-shadow(0 4px 8px rgba(0, 188, 212, 0.3));
  }

  ${OptionLabel}.selected & {
    transform: scale(1.15);
    filter: drop-shadow(0 0 12px rgba(0, 188, 212, 0.6));
  }
`;

export const OptionContent = styled.div`
  flex: 1;
  transition: all 0.3s ease;

  .option-title {
    font-weight: 600;
    margin-bottom: 6px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.95);
    transition: all 0.3s ease;
  }

  .option-description {
    font-size: 13px;
    opacity: 0.7;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s ease;
    line-height: 1.4;
  }

  ${OptionLabel}:hover & {
    .option-title {
      color: rgba(0, 188, 212, 0.9);
      transform: translateX(4px);
    }

    .option-description {
      opacity: 0.9;
      color: rgba(255, 255, 255, 0.8);
      transform: translateX(4px);
    }
  }

  ${OptionLabel}.selected & {
    .option-title {
      color: rgba(255, 255, 255, 1);
      font-weight: 700;
    }

    .option-description {
      opacity: 1;
      color: rgba(255, 255, 255, 0.9);
    }
  }
`;

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.5rem;
  gap: 1.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const BaseButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
  min-width: 140px;
  position: relative;
  overflow: hidden;

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
      ${colors.alpha.white02},
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

export const BackButton = styled(BaseButton)`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

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
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.08) 100%
    );
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);

    &::before {
      left: 100%;
    }
  }
`;

export const ContinueButton = styled(BaseButton)`
  background: linear-gradient(135deg, #00bcd4 0%, #00acc1 50%, #0097a7 100%);
  color: white;
  min-width: 280px;
  padding: 1.2rem 3rem;
  border-radius: 16px;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 8px 32px rgba(0, 188, 212, 0.4), 0 4px 16px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  animation: pulseGlow 4s ease-in-out infinite;

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
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.6s ease;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transition: all 0.4s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.05);
    background: linear-gradient(135deg, #00acc1 0%, #0097a7 50%, #006064 100%);
    box-shadow: 0 12px 48px rgba(0, 188, 212, 0.6),
      0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: none;

    &::before {
      left: 100%;
    }

    &::after {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    animation: none;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }

  @keyframes pulseGlow {
    0%,
    100% {
      box-shadow: 0 8px 32px rgba(0, 188, 212, 0.4),
        0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    50% {
      box-shadow: 0 12px 48px rgba(0, 188, 212, 0.6),
        0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
  }

  @media (max-width: 768px) {
    min-width: 250px;
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
  }
`;

export const InitialScreenContainer = styled.div`
  text-align: center;
  animation: ${fadeInUp} 1s ease-out;
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(0, 188, 212, 0.15) 0%,
      transparent 50%
    );
    animation: ${float} 8s ease-in-out infinite;
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 10%;
    right: 15%;
    width: 100px;
    height: 100px;
    background: linear-gradient(
      135deg,
      rgba(0, 188, 212, 0.1),
      rgba(124, 58, 237, 0.1)
    );
    border-radius: 50%;
    filter: blur(40px);
    animation: ${float} 12s ease-in-out infinite reverse;
    z-index: -1;
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    margin-bottom: 1rem;
    background: linear-gradient(
      135deg,
      #ffffff 0%,
      #e0f7ff 25%,
      #00bcd4 50%,
      #ffffff 75%,
      #7c3aed 100%
    );
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s ease-in-out infinite,
      ${float} 6s ease-in-out infinite;
    position: relative;
    z-index: 2;
    font-weight: 800;
    text-shadow: 0 0 30px rgba(0, 188, 212, 0.3);
    line-height: 1.1;
  }

  p {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2.5rem;
    line-height: 1.5;
    position: relative;
    z-index: 2;
    font-weight: 400;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .features {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
    margin-bottom: 2.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    .feature {
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.05) 100%
      );
      backdrop-filter: blur(20px) saturate(180%);
      border-radius: 14px;
      padding: 1.4rem 1.2rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3),
        0 2px 6px rgba(0, 188, 212, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      animation: ${fadeInUp} 0.8s ease-out;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      position: relative;
      overflow: hidden;
      z-index: 1;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(
          90deg,
          transparent 0%,
          #00bcd4 50%,
          transparent 100%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:hover {
        transform: translateY(-2px) scale(1.005);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.15) 0%,
          rgba(255, 255, 255, 0.08) 100%
        );
        box-shadow: 0 8px 32px rgba(0, 188, 212, 0.2),
          0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        border-color: rgba(0, 188, 212, 0.4);

        &::before {
          opacity: 1;
        }

        .icon {
          transform: scale(1.2) rotateY(360deg);
        }
      }

      &:nth-child(1) {
        animation-delay: 0.1s;
      }
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      &:nth-child(3) {
        animation-delay: 0.3s;
      }
      &:nth-child(4) {
        animation-delay: 0.4s;
      }

      .icon {
        font-size: 2rem;
        margin-bottom: 0.7rem;
        display: block;
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        filter: drop-shadow(0 4px 8px rgba(0, 188, 212, 0.3));
      }

      .title {
        font-size: 1.05rem;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 0.8rem;
        background: linear-gradient(
          135deg,
          #ffffff 0%,
          #e0f7ff 50%,
          #00bcd4 100%
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .description {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.4;
        font-weight: 400;
      }
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;
