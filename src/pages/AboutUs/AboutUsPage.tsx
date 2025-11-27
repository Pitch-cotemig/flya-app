import React from "react";
import styled from "styled-components";
import flyaLogo from "../../assets/flyalogo.svg";
import {
  Target,
  Users,
  Globe,
  Lightbulb,
  Shield,
  Sparkles,
} from "lucide-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Container = styled.div`
  min-height: 100vh;
  color: white;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  img {
    width: 60px;
    height: 60px;
  }

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: 4rem;

  h2 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: white;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    opacity: 0.95;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: white;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    opacity: 0.9;
  }
`;

const TeamSection = styled.div`
  text-align: center;
  margin-top: 4rem;

  h2 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }
`;

const TeamGrid = styled.div`
  margin-top: 3rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 2rem;

  .react-multi-carousel-list {
    padding: 2rem 0 3rem;
  }

  .react-multi-carousel-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
  }

  .react-multi-carousel-dot-list {
    bottom: 0;
  }

  .react-multi-carousel-dot button {
    background: rgba(255, 255, 255, 0.5);
    border-color: rgba(255, 255, 255, 0.5);
  }

  .react-multi-carousel-dot--active button {
    background: white;
    border-color: white;
  }

  .react-multiple-carousel__arrow {
    background: rgba(255, 255, 255, 0.2);
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  .react-multiple-carousel__arrow::before {
    color: white;
  }
`;

const TeamMember = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
  text-align: center;

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    opacity: 0.8;
    margin: 0;
  }
`;

const AboutUsPage: React.FC = () => {
  return (
    <Container>
      <Content>
        <Header>
          <Logo>
            <img src={flyaLogo} alt="Flya" />
            <h1>Sobre a Flya</h1>
          </Logo>
          <Subtitle>
            Transformando sonhos de viagem em experiências inesquecíveis. Somos
            uma plataforma inovadora que conecta viajantes aos melhores destinos
            do mundo.
          </Subtitle>
        </Header>

        <Section>
          <h2>Nossa Missão</h2>
          <p>
            Na Flya, acreditamos que cada viagem é uma oportunidade única de
            descoberta, crescimento e conexão. Nossa missão é democratizar o
            acesso a experiências de viagem excepcionais, oferecendo ferramentas
            inteligentes e personalizadas que transformam o planejamento de
            viagens em uma jornada emocionante.
          </p>
          <p>
            Combinamos tecnologia de ponta com um profundo entendimento das
            necessidades dos viajantes modernos, criando uma plataforma que não
            apenas facilita o planejamento, mas também inspira e conecta pessoas
            ao redor do mundo.
          </p>
        </Section>

        <Section>
          <h2>Nossos Valores</h2>
          <Grid>
            <Card>
              <h3>
                <Target size={24} style={{ marginRight: "8px" }} /> Inovação
              </h3>
              <p>
                Estamos constantemente buscando novas formas de melhorar a
                experiência de viagem, utilizando tecnologia avançada e design
                intuitivo.
              </p>
            </Card>
            <Card>
              <h3>
                <Users size={24} style={{ marginRight: "8px" }} /> Comunidade
              </h3>
              <p>
                Acreditamos no poder da comunidade. Conectamos viajantes,
                compartilhamos experiências e construímos uma rede global de
                exploradores.
              </p>
            </Card>
            <Card>
              <h3>
                <Globe size={24} style={{ marginRight: "8px" }} />{" "}
                Sustentabilidade
              </h3>
              <p>
                Promovemos viagens responsáveis e sustentáveis, incentivando
                práticas que preservam os destinos para futuras gerações.
              </p>
            </Card>
            <Card>
              <h3>
                <Lightbulb size={24} style={{ marginRight: "8px" }} />{" "}
                Personalização
              </h3>
              <p>
                Cada viajante é único. Nossas ferramentas se adaptam às
                preferências individuais, criando experiências verdadeiramente
                personalizadas.
              </p>
            </Card>
            <Card>
              <h3>
                <Shield size={24} style={{ marginRight: "8px" }} /> Confiança
              </h3>
              <p>
                A segurança e confiabilidade são fundamentais. Garantimos que
                cada interação seja segura e transparente.
              </p>
            </Card>
            <Card>
              <h3>
                <Sparkles size={24} style={{ marginRight: "8px" }} /> Excelência
              </h3>
              <p>
                Buscamos a excelência em tudo que fazemos, desde o atendimento
                ao cliente até a qualidade das recomendações.
              </p>
            </Card>
          </Grid>
        </Section>

        <Section>
          <h2>Nossa História</h2>
          <p>
            A Flya nasceu da paixão por viagens e da frustração com as
            limitações das plataformas existentes. Fundada em 2024 por um grupo
            de desenvolvedores e entusiastas de viagem, nossa empresa começou
            como um projeto pequeno em Belo Horizonte, Minas Gerais.
          </p>
          <p>
            O que começou como uma solução local rapidamente evoluiu para uma
            plataforma nacional, e hoje estamos expandindo nossos horizontes
            para atender viajantes em todo o Brasil e, em breve, na América
            Latina.
          </p>
          <p>
            Nossa jornada é marcada por constantes inovações, feedback valioso
            de nossa comunidade de usuários e um compromisso inabalável com a
            excelência em tudo que fazemos.
          </p>
        </Section>

        <TeamSection>
          <h2>Nossa Equipe</h2>
          <p>
            Somos uma equipe diversificada de profissionais apaixonados por
            tecnologia, design e viagens. Nossa expertise abrange desde
            desenvolvimento de software até marketing digital e atendimento ao
            cliente.
          </p>
          <TeamGrid>
            <Carousel
              responsive={{
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 3,
                  slidesToSlide: 1,
                },
                tablet: {
                  breakpoint: { max: 1024, min: 640 },
                  items: 2,
                  slidesToSlide: 1,
                },
                mobile: {
                  breakpoint: { max: 640, min: 0 },
                  items: 1,
                  slidesToSlide: 1,
                },
              }}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="transform 500ms ease-in-out"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={[]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              showDots={true}
              swipeable={true}
              draggable={true}
            >
              <TeamMember>
                <h3>Cairo Rodrigues</h3>
                <p>CEO & Fundador</p>
              </TeamMember>
              <TeamMember>
                <h3>Gustavo Albuquerque</h3>
                <p>CTO & Desenvolvedor</p>
              </TeamMember>
              <TeamMember>
                <h3>Lucas Diniz</h3>
                <p>Designer UX/UI</p>
              </TeamMember>
              <TeamMember>
                <h3>Eduarda</h3>
                <p>Marketing Digital</p>
              </TeamMember>
              <TeamMember>
                <h3>Bernardo Orsi</h3>
                <p>Desenvolvedor</p>
              </TeamMember>
              <TeamMember>
                <h3>Izabela</h3>
                <p>Desenvolvedora</p>
              </TeamMember>
            </Carousel>
          </TeamGrid>
        </TeamSection>

        <Section>
          <h2>Nossos Números</h2>
          <Grid>
            <Card>
              <h3>10K+</h3>
              <p>Usuários ativos</p>
            </Card>
            <Card>
              <h3>500+</h3>
              <p>Destinos cadastrados</p>
            </Card>
            <Card>
              <h3>95%</h3>
              <p>Satisfação dos usuários</p>
            </Card>
            <Card>
              <h3>24/7</h3>
              <p>Suporte disponível</p>
            </Card>
          </Grid>
        </Section>

        <Section>
          <h2>Contato</h2>
          <p>
            Quer saber mais sobre a Flya ou tem alguma sugestão? Estamos sempre
            abertos para conversar com nossa comunidade.
          </p>
          <p>
            <strong>Email:</strong> flya.corporation@gmail.com
            <br />
            <strong>Telefone:</strong> (31) 9197-9678
            <br />
            <strong>Endereço:</strong> Belo Horizonte, MG, Brasil
          </p>
        </Section>
      </Content>
    </Container>
  );
};

export default AboutUsPage;
