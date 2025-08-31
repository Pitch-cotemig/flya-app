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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
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
  animation: ${fadeInUp} 0.6s ease-out;

  .loading-icon {
    font-size: 64px;
    margin-bottom: 24px;
    animation: ${bounce} 2s infinite;
  }

  .loading-title {
    font-size: 28px;
    font-weight: 700;
    color: ${colors.text.primary};
    margin-bottom: 16px;
    background: linear-gradient(
      135deg,
      ${colors.primary.cyan} 0%,
      ${colors.primary.purple} 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .loading-subtitle {
    font-size: 16px;
    color: ${colors.text.primaryAlpha80};
    margin-bottom: 32px;
    line-height: 1.6;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid ${colors.alpha.white03};
    border-top: 3px solid ${colors.primary.cyan};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin-bottom: 24px;
  }

  .loading-steps {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 300px;

    .step {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: ${colors.alpha.white01};
      border-radius: 12px;
      backdrop-filter: blur(10px);
      border: 1px solid ${colors.alpha.white02};
      animation: ${fadeInUp} 0.6s ease-out;

      &.completed {
        background: ${colors.alpha.cyan02};
        border-color: ${colors.primary.cyan};

        &::after {
          content: "✓";
          color: ${colors.primary.cyan};
          font-weight: bold;
        }
      }

      .step-icon {
        font-size: 20px;
      }

      .step-text {
        font-size: 14px;
        color: ${colors.text.primaryAlpha90};
      }
    }
  }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    animation: ${float} 20s ease-in-out infinite;
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
`;

export const FormContainer = styled.div`
  position: relative;
  z-index: 2;
  background: ${colors.background.primaryAlpha};
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  width: 100%;
  max-width: 700px;
  box-shadow: ${colors.shadow.modal}, 0 0 0 1px ${colors.alpha.cyan02};
  border: 1px solid ${colors.alpha.cyan03};
  animation: ${fadeInUp} 0.8s ease-out;
  transition: all 0.3s ease;
  color: ${colors.text.primary};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${colors.shadow.modalStrong},
      0 0 0 1px ${colors.border.primaryHover};
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
  margin-bottom: 30px;
  gap: 8px;
`;

export const StepDot = styled.div<{ $active?: boolean; $completed?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) =>
    props.$completed
      ? "${colors.primary.cyan}"
      : props.$active
      ? "${colors.primary.purple}"
      : "${colors.alpha.white03}"};
  transition: all 0.3s ease;
  position: relative;

  ${(props) =>
    props.$active &&
    css`
      animation: ${pulse} 2s infinite;
      &::after {
        content: "";
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border-radius: 50%;
        background: ${colors.alpha.purple03};
        animation: ${pulse} 2s infinite;
      }
    `}
`;

export const StepLine = styled.div<{ $completed?: boolean }>`
  height: 2px;
  background: ${(props) =>
    props.$completed ? "${colors.primary.cyan}" : "${colors.alpha.white03}"};
  transition: all 0.3s ease;
  flex: 1;
  max-width: 40px;
`;

export const StepText = styled.span`
  font-size: 14px;
  color: ${colors.text.primary};
  font-weight: 500;
  margin-left: 16px;
`;

export const QuestionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
  background: ${colors.gradients.background};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeInUp} 0.6s ease-out;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${colors.primary.cyan},
      ${colors.primary.purple}
    );
    border-radius: 2px;
  }
`;

export const OptionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
`;

export const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(
    135deg,
    ${colors.text.primaryAlpha90} 0%,
    ${colors.text.primaryAlpha80} 100%
  );
  border-radius: 16px;
  border: 2px solid ${colors.alpha.white02};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

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
    transform: translateY(-3px);
    border-color: ${colors.primary.cyan};
    box-shadow: ${colors.shadow.cyan};

    &::before {
      left: 100%;
    }
  }

  &.selected {
    background: linear-gradient(
      135deg,
      ${colors.primary.cyan} 0%,
      ${colors.primary.purple} 100%
    );
    color: white;
    border-color: ${colors.primary.cyan};
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.cyanStrong};

    &::after {
      content: "✨";
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      animation: ${float} 3s ease-in-out infinite;
    }
  }
`;

export const RadioInput = styled.input.attrs({ type: "radio" })`
  margin-right: 16px;
  width: 20px;
  height: 20px;
  accent-color: ${colors.primary.cyan};
  cursor: pointer;
`;

export const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
  margin-right: 16px;
  width: 20px;
  height: 20px;
  accent-color: ${colors.primary.purple};
  cursor: pointer;
`;

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  gap: 20px;
`;

const BaseButton = styled.button`
  padding: 16px 32px;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
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
  background: ${colors.text.primaryAlpha90};
  color: #667eea;
  border: 2px solid ${colors.alpha.white03};

  &:hover {
    background: ${colors.neutral.white};
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.md};
  }
`;

export const ContinueButton = styled(BaseButton)`
  background: linear-gradient(
    135deg,
    ${colors.primary.cyan} 0%,
    ${colors.primary.purple} 100%
  );
  color: white;
  min-width: 140px;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: ${colors.shadow.cyanStrong};
  }

  &:disabled {
    background: ${colors.alpha.white02};
    cursor: not-allowed;
    transform: none;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

export const InitialScreenContainer = styled.div`
  text-align: center;
  animation: ${fadeInUp} 1s ease-out;
  position: relative;

  &::before {
    content: "✈️";
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 60px;
    animation: ${float} 4s ease-in-out infinite;
    opacity: 0.8;
  }

  h1 {
    font-size: 56px;
    margin-bottom: 20px;
    background: linear-gradient(
      135deg,
      ${colors.primary.cyan} 0%,
      ${colors.primary.purple} 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${float} 6s ease-in-out infinite;
    position: relative;
    z-index: 2;
  }

  p {
    font-size: 20px;
    color: ${colors.text.primaryAlpha90};
    margin-bottom: 40px;
    line-height: 1.6;
    position: relative;
    z-index: 2;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    .feature {
      background: ${colors.alpha.white01};
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 20px;
      border: 1px solid ${colors.alpha.white02};
      animation: ${fadeInUp} 0.8s ease-out;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        background: ${colors.background.glassStrong};
      }

      .icon {
        font-size: 32px;
        margin-bottom: 12px;
        display: block;
      }

      .title {
        font-size: 16px;
        font-weight: 600;
        color: ${colors.text.primary};
        margin-bottom: 8px;
      }

      .description {
        font-size: 14px;
        color: ${colors.text.primaryAlpha80};
        line-height: 1.4;
      }
    }
  }
`;
