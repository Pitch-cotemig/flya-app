import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { User } from "lucide-react";

export const HeaderContainer = styled.header`
  position: absolute;
  z-index: 50;
  width: 100%;
  padding: 1rem 1rem 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.5rem 2rem 0;
  }
`;

export const HeaderContent = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #1c1c43;
  padding: 0 1.5rem;
  backdrop-filter: blur(12px);
`;

export const Logo = styled(Link)`
  flex-shrink: 0;

  img {
    height: 2rem;
    width: auto;
  }
`;

export const Navigation = styled.nav`
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

export const StyledNavLink = styled(NavLink)`
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

export const LoginSection = styled.div`
  flex-shrink: 0;
`;

export const LoginButton = styled.button`
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

export const UserIcon = styled(User)`
  width: 1rem;
  height: 1rem;
`;
