import styled from "styled-components";
import { colors } from "../../../design-tokens/colors";

export const SectionDivider = styled.div`
  width: 60px;
  height: 3px;
  background: ${colors.gradients.primary};
  margin: 40px auto;
  border-radius: 2px;
  opacity: 0.8;
`;

export const CompanionIcon = styled.span`
  font-size: 28px;
  transition: all 0.3s ease;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
`;

export const TransportIcon = styled.span`
  font-size: 28px;
  transition: all 0.3s ease;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
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
