import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import flyaLogo from "../../assets/flyalogo.svg";
import { User } from "../../services/authService";
import { MobileSidebar } from "./MobileSidebar";
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  Navigation,
  StyledNavLink,
  LoginSection,
  LoginButton,
  UserIcon,
  MobileMenuButton,
} from "./styles";

interface HeaderProps {
  user: User | null;
}

export function Header({ user }: HeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Dados dos links de navegação
  const navLinks = [
    { label: "Início", to: "/" },
    { label: "Nova Viagem", to: "/Planejamento" },
    { label: "Minha Mala", to: "/Minha-Mala" },
    { label: "Minhas Viagens", to: "/Minhas-Viagens" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Sidebar para Mobile */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        user={user}
        navLinks={navLinks}
      />

      <HeaderContainer>
        <HeaderContent>
          {/* Botão Hamburger para Mobile */}
          <MobileMenuButton onClick={toggleSidebar} aria-label="Abrir menu">
            <Menu />
          </MobileMenuButton>

          {/* Logo na Esquerda */}
          <Logo to="/">
            <img src={flyaLogo} alt="Flya Logo" />
          </Logo>

          {/* Links de Navegação no Centro (Desktop apenas) */}
          <Navigation>
            {navLinks.map((link) => (
              <StyledNavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.label}
              </StyledNavLink>
            ))}
          </Navigation>

          {/* Login na Direita */}
          <LoginSection>
            {user ? (
              <Link to="/Perfil">
                <LoginButton>
                  <UserIcon />
                  Perfil
                </LoginButton>
              </Link>
            ) : (
              <Link to="/auth">
                <LoginButton>
                  <UserIcon />
                  Login
                </LoginButton>
              </Link>
            )}
          </LoginSection>
        </HeaderContent>
      </HeaderContainer>
    </>
  );
}

export default Header;
