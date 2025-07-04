import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { PageContainer, ContentWrap } from "./styles";

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

export default MainLayout;
