import { Outlet } from "react-router-dom";
import { Footer, Header } from "..";
import { User } from "../../services/authService";

interface MainLayoutProps {
  user: User | null;
}

export function MainLayout({ user }: MainLayoutProps) {
  return (
    <>
      <Header user={user} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
