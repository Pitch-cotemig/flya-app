import { Outlet, useLocation } from "react-router-dom";
import { Footer, Header } from "..";
import { User } from "../../services/authService";
import { ReactNode } from "react";
import { PageContainer, ContentWrap } from "./styles";

export interface MainLayoutProps {
  user: User | null;
  children?: ReactNode;
}

export function MainLayout({ user, children }: MainLayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <PageContainer>
      <Header user={user} />
      <ContentWrap $isHomePage={isHomePage}>
        <Outlet />
        {children}
      </ContentWrap>
      <Footer />
    </PageContainer>
  );
}

export default MainLayout;
