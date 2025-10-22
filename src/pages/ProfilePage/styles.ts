import styled from "styled-components";
import { colors } from "../../design-tokens/colors";

export const ProfileHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid ${colors.profile.border};
  background: ${colors.profile.surface};
  color: white;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: white;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0;
    color: #cbd5e1;
  }
`;