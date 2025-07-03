import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.gray[900]};
  color: ${({ theme }) => theme.colors.white};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 25% 25%,
        rgba(0, 188, 212, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 75% 75%,
        rgba(0, 188, 212, 0.1) 0%,
        transparent 50%
      );
    animation: footerGlow 12s ease-in-out infinite;
  }

  @keyframes footerGlow {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
`;

export const FooterContent = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 3rem 1.5rem;
  position: relative;
  z-index: 1;
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const LogoSection = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: span 1;
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    height: 1.75rem;
    width: auto;
    filter: drop-shadow(0 0 5px rgba(0, 188, 212, 0.3));
  }

  span {
    font-size: 1.5rem;
    font-weight: 700;
    font-family: ${({ theme }) => theme.fonts.main};
    background: linear-gradient(45deg, #ffffff, #00bcd4);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const LogoDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-family: ${({ theme }) => theme.fonts.main};
`;

export const FooterColumn = styled.div``;

export const ColumnTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
`;

export const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LinkItem = styled.li``;

export const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray[400]};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.main};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.gray[400]};
`;

export const ContactItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.main};
`;

export const ContactLink = styled.a`
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.gray[400]};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const CopyrightSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[800]};
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.fonts.main};
`;

export const CopyrightLinks = styled.div`
  margin-top: 0.5rem;

  a {
    color: inherit;
    text-decoration: none;
    margin: 0 0.5rem;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;
