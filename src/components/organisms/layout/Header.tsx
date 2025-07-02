import { Link, NavLink } from "react-router-dom";
import { User } from "lucide-react";
import styled from 'styled-components';
import { Button } from "@/components/atoms/ui/Button";
import flyaLogo from '@/assets/flyalogo.svg';

const HeaderContainer = styled.header`
  position: absolute;
  z-index: 50;
  width: 100%;
  padding: 1rem 1rem 0;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.5rem 2rem 0;
  }
`;

const HeaderContent = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(30, 27, 75, 0.8);
  padding: 0 1.5rem;
  backdrop-filter: blur(12px);
`;

const Logo = styled(Link)`
  flex-shrink: 0;
  
  img {
    height: 2rem;
    width: auto;
  }
`;

const Navigation = styled.nav`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: none;
  align-items: center;
  gap: 1.5rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

const StyledNavLink = styled(NavLink)`
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.main};
  transition: color 0.2s ease-in-out;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray[400]};
  
  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
  
  &.active {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const LoginSection = styled.div`
  flex-shrink: 0;
`;

const LoginButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const UserIcon = styled(User)`
  width: 1rem;
  height: 1rem;
`;

export function Header() {
  // Dados dos links de navegação
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Nova Viagem", to: "/planejamento" },
    { label: "Minha Mala", to: "/mala" }, // Exemplo de outra rota
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
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {link.label}
            </StyledNavLink>
          ))}
        </Navigation>

        {/* Login na Direita */}
        <LoginSection>
          <Link to="/auth">
            <LoginButton variant="ghost">
              <UserIcon />
              Login
            </LoginButton>
          </Link>
        </LoginSection>
      </HeaderContent>
    </HeaderContainer>
  );
} 