import styled from "styled-components";

export const ToastsWrapper = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  pointer-events: none;

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    left: 1rem;
  }

  /* Allow interaction with individual toasts */
  > * {
    pointer-events: all;
  }
`;
