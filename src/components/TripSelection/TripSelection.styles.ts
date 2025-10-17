import styled from "styled-components";
import { colors } from "../../design-tokens/colors";

export const TripSelectionContainer = styled.div`
  min-height: calc(100vh - 140px);
  background: ${colors.background.primary};
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    pointer-events: none;
  }
`;

export const TripSelectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
`;

export const TripSelectionTitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    ${colors.primary.cyan},
    ${colors.primary.purple}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;

  svg {
    filter: drop-shadow(0 2px 4px rgba(0, 188, 212, 0.3));
  }
`;

export const TripSelectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${colors.text.secondary};
  margin: 0;
`;

export const TripsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

export const TripCard = styled.div`
  background: ${colors.background.glass};
  backdrop-filter: blur(20px);
  border: 1px solid ${colors.border.white};
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${colors.primary.cyan},
      ${colors.primary.purple}
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: ${colors.alpha.cyan03};

    &::before {
      opacity: 1;
    }
  }
`;

export const TripImage = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(
    135deg,
    ${colors.primary.cyan}20,
    ${colors.primary.purple}20
  );
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;

  svg {
    color: ${colors.primary.cyan};
  }
`;

export const TripInfo = styled.div`
  flex: 1;
`;

export const TripDestination = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${colors.text.primary};
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
`;

export const TripMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const TripDuration = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: ${colors.text.secondary};

  svg {
    color: ${colors.primary.cyan};
  }
`;

export const BagStatus = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "hasBag",
})<{ hasBag: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: ${(props) =>
    props.hasBag ? colors.state.success : colors.text.secondary};

  svg {
    color: ${(props) =>
      props.hasBag ? colors.state.success : colors.text.secondary};
  }
`;

export const TripActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

export const SelectTripButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(
    135deg,
    ${colors.primary.cyan},
    ${colors.primary.purple}
  );
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 25px rgba(0, 188, 212, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    flex-shrink: 0;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  max-width: 500px;
  margin: 2rem auto;
  position: relative;
  z-index: 1;
`;

export const EmptyIcon = styled.div`
  margin-bottom: 2rem;

  svg {
    color: ${colors.text.secondary};
    opacity: 0.6;
  }
`;

export const EmptyText = styled.p`
  font-size: 1.1rem;
  color: ${colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;
