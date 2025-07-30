import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Footer, Header } from "..";
import { User } from "../../services/authService";

const HEADER_HEIGHT = '6rem';

const MainContent = styled.main`
  padding-top: ${HEADER_HEIGHT};
`;

interface MainLayoutProps {
  user: User | null;
}

export function MainLayout({ user }: MainLayoutProps) {
  return (
    <>
      <Header user={user} />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </>
  );
}

export default MainLayout;
