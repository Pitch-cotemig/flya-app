import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { User } from "lucide-react";

export const HeaderContainer = styled.header<{ $isHomePage?: boolean }>`
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  max-width: 100vw;
  padding: 0.5rem 0.75rem 0;
  animation: slideInFromTop 0.8s ease-out;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  @keyframes slideInFromTop {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.75rem 1rem 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1rem 1.5rem 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 1.5rem 2rem 0;
  }
`;

export const HeaderContent = styled.div<{ $isHomePage?: boolean }>`
  position: relative;
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  height: 3.5rem;
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(15, 23, 42, 0.9);
  padding: 0 0.5rem;
  backdrop-filter: blur(20px) saturate(180%);
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  gap: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 3.75rem;
    padding: 0 0.75rem;
    gap: 0.75rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 4rem;
    padding: 0 1.5rem;
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    gap: 0;
  }

  &:hover {
    border-color: rgba(0, 188, 212, 0.4);
    box-shadow: 0 8px 30px rgba(0, 188, 212, 0.2), 0 4px 15px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    background-color: rgba(15, 23, 42, 0.95);
  }
`;

export const Logo = styled(Link)`
  flex-shrink: 0;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    transform: scale(1.05);
  }

  img {
    height: 1.75rem;
    width: auto;
    filter: drop-shadow(0 0 5px rgba(0, 188, 212, 0.3));

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      height: 2rem;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      height: 2.25rem;
    }
  }
`;

export const Navigation = styled.nav`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: none;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    gap: 0.75rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: 1rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    gap: 1.5rem;
  }
`;

export const StyledNavLink = styled(NavLink)`
  white-space: nowrap;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.main};
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray[400]};
  position: relative;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 0.875rem;
    padding: 0.5rem 0.85rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding: 0.5rem 1rem;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #00bcd4, #00acc1);
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: rgba(0, 188, 212, 0.1);
    transform: translateY(-2px);

    &::after {
      width: 80%;
    }
  }

  &.active {
    color: ${({ theme }) => theme.colors.white};
    background: rgba(0, 188, 212, 0.15);

    &::after {
      width: 80%;
    }
  }
`;

export const LoginSection = styled.div`
  flex-shrink: 0;
`;

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: linear-gradient(
    135deg,
    rgba(0, 188, 212, 0.1) 0%,
    rgba(0, 188, 212, 0.2) 100%
  );
  padding: 0.4rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(0, 188, 212, 0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.5rem;
    padding: 0.45rem 0.85rem;
    font-size: 0.8125rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(0, 188, 212, 0.2) 0%,
      rgba(0, 188, 212, 0.3) 100%
    );
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
    border-color: rgba(0, 188, 212, 0.5);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

export const UserIcon = styled(User)`
  width: 0.875rem;
  height: 0.875rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 0.9375rem;
    height: 0.9375rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 1rem;
    height: 1rem;
  }
`;

export const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(0, 188, 212, 0.1) 0%,
    rgba(0, 188, 212, 0.2) 100%
  );
  border: 1px solid rgba(0, 188, 212, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
  margin-right: 0.5rem;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(0, 188, 212, 0.2) 0%,
      rgba(0, 188, 212, 0.3) 100%
    );
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
