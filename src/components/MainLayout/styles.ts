import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.custom.darkBlue};
`;

export const ContentWrap = styled.main`
  flex: 1;
  padding-top: 7rem;
`;
