import styled, { keyframes } from "styled-components";
import { colors } from "../../design-tokens/colors";

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const subtleFloat = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-4px);
  }
`;

export const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
`;

export const DashboardContainer = styled.div`
  min-height: 100vh;
  padding: 140px 32px 100px;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
`;

export const Header = styled.header`
  max-width: 1400px;
  margin: 0 auto 60px;
  text-align: center;
  animation: ${fadeInUp} 0.8s ease-out;
`;

export const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 16px;
  background: ${colors.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  line-height: 1.1;
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${colors.text.muted};
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

export const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 60px;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: ${colors.background.primaryAlpha};
  backdrop-filter: blur(12px);
  padding: 28px 24px;
  border-radius: 16px;
  border: 1px solid ${colors.alpha.white01};
  box-shadow: ${colors.shadow.card};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${colors.gradients.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${colors.shadow.cardHover};
    border-color: ${colors.alpha.cyan03};

    &::before {
      opacity: 1;
    }
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: ${colors.gradients.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    box-shadow: ${colors.shadow.cyan};
  }

  .number {
    font-size: 2.25rem;
    font-weight: 700;
    background: ${colors.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;
    display: block;
    line-height: 1;
  }

  .label {
    font-size: 0.875rem;
    color: ${colors.text.muted};
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export const SectionsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 60px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const Section = styled.section`
  background: ${colors.background.primaryAlpha};
  backdrop-filter: blur(12px);
  padding: 32px;
  border-radius: 20px;
  border: 1px solid ${colors.alpha.white01};
  box-shadow: ${colors.shadow.card};
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.text.primary};
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;

  .icon {
    color: ${colors.primary.cyan};
  }
`;

export const RecentTripsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RecentTripItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: ${colors.background.surface};
  border-radius: 12px;
  border: 1px solid ${colors.alpha.white01};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateX(4px);
    border-color: ${colors.alpha.cyan03};
    box-shadow: ${colors.shadow.sm};
  }

  .trip-info {
    flex: 1;
  }

  .trip-destination {
    font-size: 1rem;
    font-weight: 600;
    color: ${colors.text.primary};
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .trip-dates {
    font-size: 0.875rem;
    color: ${colors.text.muted};
  }

  .trip-actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .favorite-icon {
    color: ${colors.state.warning};
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const ChartContainer = styled.div`
  margin-top: 24px;
  padding: 20px;
  background: ${colors.background.surface};
  border-radius: 12px;
  border: 1px solid ${colors.alpha.white01};
`;

export const ChartBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  .month-label {
    font-size: 0.875rem;
    color: ${colors.text.muted};
    min-width: 40px;
    font-weight: 500;
  }

  .bar-wrapper {
    flex: 1;
    height: 32px;
    background: ${colors.background.primary};
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }

  .bar-fill {
    height: 100%;
    background: ${colors.gradients.primary};
    border-radius: 8px;
    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 8px;
    min-width: 32px;
  }

  .count {
    font-size: 0.75rem;
    color: ${colors.text.primary};
    font-weight: 600;
  }
`;

export const DestinationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`;

export const DestinationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: ${colors.background.surface};
  border-radius: 10px;
  border: 1px solid ${colors.alpha.white01};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
    border-color: ${colors.alpha.cyan03};
  }

  .destination-name {
    font-size: 0.9375rem;
    color: ${colors.text.primary};
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .destination-count {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${colors.primary.cyan};
    background: ${colors.alpha.cyan01};
    padding: 4px 12px;
    border-radius: 20px;
  }
`;

export const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
`;

export const QuickActionCard = styled.button`
  background: ${colors.background.primaryAlpha};
  backdrop-filter: blur(12px);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid ${colors.alpha.white01};
  box-shadow: ${colors.shadow.card};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${colors.shadow.cardHover};
    border-color: ${colors.alpha.cyan03};
  }

  &:active {
    transform: translateY(-2px);
  }

  .action-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    background: ${colors.gradients.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${colors.shadow.cyan};
  }

  .action-label {
    font-size: 1rem;
    font-weight: 600;
    color: ${colors.text.primary};
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 80px 32px;
  color: ${colors.text.muted};
  background: ${colors.background.primaryAlpha};
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid ${colors.alpha.white01};
  box-shadow: ${colors.shadow.card};
  animation: ${subtleFloat} 3s ease-in-out infinite;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 16px;
    color: ${colors.text.primary};
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    max-width: 500px;
    margin: 0 auto 32px;
    color: ${colors.text.muted};
  }

  .icon {
    font-size: 4rem;
    margin-bottom: 24px;
    display: block;
    color: ${colors.primary.cyan};
  }
`;

export const ActionButton = styled.button`
  background: ${colors.gradients.primary};
  color: ${colors.text.primary};
  border: none;
  border-radius: 12px;
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${colors.shadow.cyan};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.cyanStrong};
  }

  &:active {
    transform: translateY(0px);
  }
`;

export const ErrorContainer = styled.div`
  text-align: center;
  padding: 60px 32px;
  background: ${colors.background.primaryAlpha};
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid ${colors.alpha.error02};
  color: ${colors.state.error};
  box-shadow: ${colors.shadow.error};

  h3 {
    font-size: 1.25rem;
    margin-bottom: 16px;
    font-weight: 600;
  }

  p {
    color: ${colors.text.muted};
    margin-bottom: 24px;
    line-height: 1.6;
  }

  .error-icon {
    font-size: 3rem;
    margin-bottom: 20px;
    display: block;
    opacity: 0.7;
  }
`;

export const RefreshButton = styled.button`
  background: transparent;
  border: 2px solid ${colors.alpha.cyan03};
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.text.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;

  &:hover {
    background: ${colors.alpha.cyan01};
    border-color: ${colors.primary.cyan};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
