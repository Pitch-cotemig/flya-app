import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.gray[900]};
  color: ${({ theme }) => theme.colors.white};
`;

const FooterContent = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 3rem 1.5rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const LogoSection = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: span 1;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  text-decoration: none;
  color: inherit;
  
  img {
    height: 1.75rem;
    width: auto;
  }
  
  span {
    font-size: 1.5rem;
    font-weight: 700;
    font-family: ${({ theme }) => theme.fonts.main};
  }
`;

const LogoDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-family: ${({ theme }) => theme.fonts.main};
`;

const FooterColumn = styled.div``;

const ColumnTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.main};
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LinkItem = styled.li``;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray[400]};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.main};
  transition: color 0.2s ease-in-out;
  
  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.gray[400]};
`;

const ContactItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.main};
`;

const ContactLink = styled.a`
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  
  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.gray[400]};
  transition: color 0.2s ease-in-out;
  
  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const CopyrightSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[800]};
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.fonts.main};
`;

const CopyrightLinks = styled.div`
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

export function Footer() {
  const solutionsLinks = [
    { label: "Planejamento Inteligente", to: "#" },
    { label: "Roteiros Personalizados", to: "#" },
    { label: "Controle de Despesas", to: "#" },
    { label: "Gestão de Orçamento", to: "#" },
    { label: "Reservas Integradas", to: "#" },
  ];

  const companyLinks = [
    { label: "Sobre Nós", to: "#" },
    { label: "Nossa Missão", to: "#" },
    { label: "Carreiras", to: "#" },
    { label: "Blog", to: "#" },
    { label: "Imprensa", to: "#" },
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          {/* Coluna do Logo e Descrição */}
          <LogoSection>
            <LogoLink to="/">
              <img src="/images/logo-placeholder.svg" alt="Flya Logo" />
              <span>Flya</span>
            </LogoLink>
            <LogoDescription>
              Sua parceira para viagens da sua vida.
            </LogoDescription>
          </LogoSection>

          {/* Coluna de Soluções */}
          <FooterColumn>
            <ColumnTitle>Soluções</ColumnTitle>
            <LinkList>
              {solutionsLinks.map(link => (
                <LinkItem key={link.label}>
                  <FooterLink to={link.to}>
                    {link.label}
                  </FooterLink>
                </LinkItem>
              ))}
            </LinkList>
          </FooterColumn>

          {/* Coluna de Empresa */}
          <FooterColumn>
            <ColumnTitle>Empresa</ColumnTitle>
            <LinkList>
              {companyLinks.map(link => (
                <LinkItem key={link.label}>
                  <FooterLink to={link.to}>
                    {link.label}
                  </FooterLink>
                </LinkItem>
              ))}
            </LinkList>
          </FooterColumn>

          {/* Coluna de Contato */}
          <FooterColumn>
            <ColumnTitle>Contato & Redes</ColumnTitle>
            <ContactList>
              <ContactItem>
                <Mail size={16} />
                <ContactLink href="mailto:contato@flya.com.br">contato@flya.com.br</ContactLink>
              </ContactItem>
              <ContactItem>
                <Phone size={16} />
                <span>(XX) XXXX-XXXX</span>
              </ContactItem>
              <ContactItem>
                <MapPin size={16} />
                <span>Belo Horizonte, MG, Brasil</span>
              </ContactItem>
            </ContactList>
            <SocialLinks>
              <SocialLink href="#"><Facebook size={20} /></SocialLink>
              <SocialLink href="#"><Twitter size={20} /></SocialLink>
              <SocialLink href="#"><Instagram size={20} /></SocialLink>
            </SocialLinks>
          </FooterColumn>
        </FooterGrid>

        {/* Linha de Copyright */}
        <CopyrightSection>
          <p>© 2025 Flya. Todos os direitos reservados.</p>
          <CopyrightLinks>
            <Link to="/politica-de-privacidade">Política de Privacidade</Link>
            |
            <Link to="/termos-de-uso">Termos de Uso</Link>
          </CopyrightLinks>
        </CopyrightSection>
      </FooterContent>
    </FooterContainer>
  );
} 