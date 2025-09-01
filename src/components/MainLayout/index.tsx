import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Footer, Header } from "..";
import { User } from "../../services/authService";
import { ReactNode } from "react";

const HEADER_HEIGHT = "1rem";

const MainContent = styled.main`
  padding-top: ${HEADER_HEIGHT};
`;

export interface MainLayoutProps {
  user: User | null;
  children?: ReactNode;
}

export function MainLayout({ user, children }: MainLayoutProps) {
  return (
    <>
      <Header user={user} />
      <MainContent>
        <Outlet />
        {children}
      </MainContent>
      <Footer />
    </>
  );
}

export default MainLayout;
