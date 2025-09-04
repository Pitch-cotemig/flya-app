import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import {
  FooterContainer,
  FooterContent,
  FooterGrid,
  LogoSection,
  LogoLink,
  LogoDescription,
  FooterColumn,
  ColumnTitle,
  LinkList,
  LinkItem,
  FooterLink,
  ContactList,
  ContactItem,
  ContactLink,
  SocialLinks,
  SocialLink,
  CopyrightSection,
  CopyrightLinks,
} from "./styles";

export function Footer() {
  const solutionsLinks = [
    { label: "Planejamento Inteligente", to: "#" },
    { label: "Roteiros Personalizados", to: "#" },
    { label: "Controle de Despesas", to: "#" },
    { label: "Gestão de Orçamento", to: "#" },
    { label: "Reservas Integradas", to: "#" },
  ];

  const companyLinks = [
    { label: "Sobre Nós", to: "/Sobre-Nos" },
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
              <img src="/images/logo.png" alt="Flya Logo" />
            </LogoLink>
            <LogoDescription>
              Sua parceira para viagens da sua vida.
            </LogoDescription>
          </LogoSection>

          {/* Coluna de Soluções */}
          <FooterColumn>
            <ColumnTitle>Soluções</ColumnTitle>
            <LinkList>
              {solutionsLinks.map((link) => (
                <LinkItem key={link.label}>
                  <FooterLink to={link.to}>{link.label}</FooterLink>
                </LinkItem>
              ))}
            </LinkList>
          </FooterColumn>

          {/* Coluna de Empresa */}
          <FooterColumn>
            <ColumnTitle>Empresa</ColumnTitle>
            <LinkList>
              {companyLinks.map((link) => (
                <LinkItem key={link.label}>
                  <FooterLink to={link.to}>{link.label}</FooterLink>
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
                <ContactLink href="mailto:contato@flya.com.br">
                  contato@flya.com.br
                </ContactLink>
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
              <SocialLink href="#">
                <Facebook size={20} />
              </SocialLink>
              <SocialLink href="#">
                <Twitter size={20} />
              </SocialLink>
              <SocialLink href="#">
                <Instagram size={20} />
              </SocialLink>
            </SocialLinks>
          </FooterColumn>
        </FooterGrid>

        {/* Linha de Copyright */}
        <CopyrightSection>
          <p>© 2025 Flya. Todos os direitos reservados.</p>
          <CopyrightLinks>
            <Link to="/Politica-De-Privacidade">Política de Privacidade</Link>|
            <Link to="/Termos-de-Uso">Termos de Uso</Link>
          </CopyrightLinks>
        </CopyrightSection>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
