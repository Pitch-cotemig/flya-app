import { Link } from "react-router-dom";
import flyaLogo from "../../assets/flyalogo.svg";
import { User } from "../../services/authService";
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  Navigation,
  StyledNavLink,
  LoginSection,
  LoginButton,
  UserIcon,
} from "./styles";

interface HeaderProps {
  user: User | null;
}

export function Header({ user }: HeaderProps) {
  // Dados dos links de navegação
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Nova Viagem", to: "/planejamento" },
    { label: "Minha Mala", to: "/mala" },
    { label: "Minhas Viagens", to: "/minhas-viagens" },
  ];

  return (
    <HeaderContainer>
      <HeaderContent>
        {/* Logo na Esquerda */}
        <Logo to="/">
          <img src={flyaLogo} alt="Flya Logo" />
        </Logo>

        {/* Links de Navegação no Centro (absoluto) */}
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
            <Link to="/perfil">
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
  );
}

export default Header;
