import styled from "styled-components";
import { colors } from "../../design-tokens/colors";

export const BagContainer = styled.div`
  min-height: 100vh;
  color: white;
  position: relative;
  overflow: hidden;
`;

export const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    top: 10%;
    left: 15%;
    width: 5px;
    height: 5px;
    background: ${colors.alpha.cyan03};
    border-radius: 50%;
    animation: float1 8s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: 70%;
    right: 20%;
    width: 4px;
    height: 4px;
    background: ${colors.alpha.cyan02};
    border-radius: 50%;
    animation: float2 10s ease-in-out infinite;
  }

  @keyframes float1 {
    0%,
    100% {
      transform: translateY(0) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-30px) scale(1.2);
      opacity: 1;
    }
  }

  @keyframes float2 {
    0%,
    100% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0.4;
    }
    50% {
      transform: translateY(-20px) translateX(15px) scale(1.3);
      opacity: 0.8;
    }
  }
`;

export const BagHeader = styled.header`
  text-align: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${colors.background.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${colors.border.white};
  border-radius: 25px;
  color: ${colors.text.primary};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.cyan};
    border-color: ${colors.alpha.cyan03};
    background: ${colors.background.glassStrong};
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    flex-shrink: 0;
  }
`;

export const BagTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(45deg, #ffffff, #00bcd4);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: slideInFromTop 1s ease-out;

  @keyframes slideInFromTop {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const BagSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${colors.text.primaryAlpha80};
  animation: slideInFromBottom 1s ease-out 0.3s both;

  @keyframes slideInFromBottom {
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

export const BagContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

export const TripInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const TripDestination = styled.div`
  background: ${colors.alpha.white01};
  padding: 1rem 2rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid ${colors.alpha.white02};
  font-size: 1.1rem;
  animation: fadeIn 1s ease-out 0.6s both;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const TripDuration = styled.div`
  background: ${colors.alpha.white01};
  padding: 1rem 2rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid ${colors.alpha.white02};
  font-size: 1.1rem;
  animation: fadeIn 1s ease-out 0.8s both;
`;

export const ProgressSection = styled.div`
  margin-bottom: 2rem;
  animation: slideInFromLeft 1s ease-out 1s both;

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const ProgressText = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${colors.alpha.white02};
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: ${colors.gradients.cyan};
  border-radius: 4px;
  width: ${(props) => props.progress}%;
  transition: width 0.5s ease;
  box-shadow: ${colors.shadow.cyanStrong};
`;

export const AddItemSection = styled.div`
  margin-bottom: 2rem;
  animation: slideInFromRight 1s ease-out 1.2s both;

  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const AddItemForm = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const AddItemInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  background: ${colors.alpha.white01};
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid ${colors.alpha.white02};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary.cyan};
    box-shadow: ${colors.shadow.cyanStrong};
    transform: translateY(-2px);
  }

  &::placeholder {
    color: ${colors.text.primaryAlpha60};
  }
`;

export const AddItemButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #00bcd4 0%, #00acc1 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: ${colors.shadow.cyanStrong};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.cyanStrong};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CategoriesSection = styled.div`
  margin-bottom: 2rem;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: ${colors.text.primaryAlpha90};
  }
`;

export const CategoryTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CategoryTab = styled.button<{ active?: boolean; variant?: "add" }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #00bcd4 0%, #00acc1 100%)"
      : "rgba(255, 255, 255, 0.1)"};
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid
    ${(props) =>
      props.active ? "${colors.alpha.cyan05}" : "${colors.alpha.white02}"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.cyan};
    background: ${(props) =>
      props.active
        ? "${colors.gradients.cyanHover}"
        : "${colors.background.glassStrong}"};
  }

  .category-icon {
    flex-shrink: 0;
    opacity: 0.9;
  }

  span {
    font-size: 1.1rem;
  }
`;

export const ItemsList = styled.div`
  display: grid;
  gap: 1rem;
  animation: fadeInUp 1s ease-out 1.5s both;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ItemCard = styled.div<{ checked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: ${colors.alpha.white01};
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid ${colors.alpha.white02};
  transition: all 0.3s ease;
  opacity: ${(props) => (props.checked ? 0.7 : 1)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.cyan};
    border-color: rgba(0, 188, 212, 0.3);
  }
`;

export const ItemCheckbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #00bcd4;
  cursor: pointer;
`;

export const ItemName = styled.div<{ checked?: boolean }>`
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: ${(props) => (props.checked ? "line-through" : "none")};
  color: ${(props) => (props.checked ? "rgba(255, 255, 255, 0.6)" : "white")};
`;

export const ItemCategory = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  .category-icon {
    opacity: 0.7;
  }
`;

export const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
`;

export const DeleteButton = styled.button`
  padding: 0.5rem;
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.2);
  border-radius: 8px;
  color: #ff6b6b;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 0, 0, 0.2);
    transform: scale(1.1);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.6);
`;

export const EmptyIcon = styled.div`
  margin-bottom: 1rem;
  opacity: 0.5;
`;

export const EmptyText = styled.p`
  font-size: 1.1rem;
`;

export const CategoriesWrapper = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
`;

export const SaveSection = styled.div`
  position: sticky;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
  z-index: 10;
`;

export const SaveButton = styled.button<{ saving?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: ${(props) =>
    props.saving
      ? colors.gradients.primary.replace("135deg", "45deg")
      : colors.gradients.primary};
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${(props) => (props.saving ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  box-shadow: ${colors.shadow.cyanStrong};
  backdrop-filter: blur(10px);
  border: 1px solid ${colors.alpha.cyan02};
  min-width: 200px;

  &:hover {
    transform: ${(props) =>
      props.saving ? "none" : "translateY(-3px) scale(1.02)"};
    box-shadow: ${(props) =>
      props.saving
        ? colors.shadow.cyanStrong
        : colors.shadow.cyan + ", 0 15px 40px rgba(0, 188, 212, 0.4)"};
  }

  &:active {
    transform: ${(props) => (props.saving ? "none" : "translateY(-1px)")};
  }

  svg {
    flex-shrink: 0;
    ${(props) =>
      props.saving &&
      `
      animation: spin 1s linear infinite;
    `}
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const SaveStatus = styled.div<{ type: "success" | "error" | "info" }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 1rem;
  backdrop-filter: blur(10px);

  ${(props) => {
    switch (props.type) {
      case "success":
        return `
          background: ${colors.alpha.white01};
          border: 1px solid ${colors.state.success}40;
          color: ${colors.state.success};
        `;
      case "error":
        return `
          background: ${colors.alpha.white01};
          border: 1px solid ${colors.state.error}40;
          color: ${colors.state.error};
        `;
      case "info":
        return `
          background: ${colors.alpha.cyan01};
          border: 1px solid ${colors.alpha.cyan02};
          color: ${colors.primary.cyan};
        `;
      default:
        return "";
    }
  }}

  svg {
    flex-shrink: 0;
  }
`;
