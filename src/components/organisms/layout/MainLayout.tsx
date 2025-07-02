import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "./Footer";
import { Header } from "./Header";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.custom.darkBlue};
`;

const ContentWrap = styled.main`
  flex: 1;
  padding-top: 7rem;
`;

export function MainLayout() {
  return (
    <PageContainer>
      <Header />
      <ContentWrap>
        <Outlet />
      </ContentWrap>
      <Footer />
    </PageContainer>
  );
} 