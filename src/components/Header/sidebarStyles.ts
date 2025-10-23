import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 998;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  max-width: 85vw;
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.98) 0%,
    rgba(28, 28, 67, 0.98) 100%
  );
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.3);
  z-index: 999;
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0, 188, 212, 0.2);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    background: linear-gradient(135deg, #ffffff 0%, #00bcd4 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.white};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(0, 188, 212, 0.5);
    transform: rotate(90deg);
  }

  &:active {
    transform: rotate(90deg) scale(0.95);
  }
`;

export const SidebarNav = styled.nav`
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 188, 212, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 188, 212, 0.5);
  }
`;

export const SidebarNavLink = styled(NavLink)`
  display: block;
  padding: 1rem 1.5rem;
  color: ${({ theme }) => theme.colors.gray[300]};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.main};
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0;
    background: linear-gradient(90deg, rgba(0, 188, 212, 0.1), transparent);
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: rgba(0, 188, 212, 0.05);
    border-left-color: rgba(0, 188, 212, 0.3);

    &::before {
      width: 100%;
    }
  }

  &.active {
    color: ${({ theme }) => theme.colors.white};
    background: rgba(0, 188, 212, 0.1);
    border-left-color: #00bcd4;
    font-weight: 600;

    &::before {
      width: 100%;
    }
  }
`;

export const SidebarFooter = styled.div`
  padding: 1rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const SidebarLoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(0, 188, 212, 0.15),
    rgba(0, 188, 212, 0.25)
  );
  border: 1px solid rgba(0, 188, 212, 0.4);
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(0, 188, 212, 0.25),
      rgba(0, 188, 212, 0.35)
    );
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;
