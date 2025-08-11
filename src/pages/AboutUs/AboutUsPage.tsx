import React from 'react';
import styled from 'styled-components';
import { MainLayout } from '../../components';
import flyaLogo from '../../assets/flyalogo.svg';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TeamMember = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
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
      <MainLayout user={null}>
        <Content>
          <Header>
            <Logo>
              <img src={flyaLogo} alt="Flya" />
              <h1>Sobre a Flya</h1>
            </Logo>
            <Subtitle>
              Transformando sonhos de viagem em experiências inesquecíveis. 
              Somos uma plataforma inovadora que conecta viajantes aos melhores destinos do mundo.
            </Subtitle>
          </Header>

          <Section>
            <h2>Nossa Missão</h2>
            <p>
              Na Flya, acreditamos que cada viagem é uma oportunidade única de descoberta, 
              crescimento e conexão. Nossa missão é democratizar o acesso a experiências 
              de viagem excepcionais, oferecendo ferramentas inteligentes e personalizadas 
              que transformam o planejamento de viagens em uma jornada emocionante.
            </p>
            <p>
              Combinamos tecnologia de ponta com um profundo entendimento das necessidades 
              dos viajantes modernos, criando uma plataforma que não apenas facilita o 
              planejamento, mas também inspira e conecta pessoas ao redor do mundo.
            </p>
          </Section>

          <Section>
            <h2>Nossos Valores</h2>
            <Grid>
              <Card>
                <h3>🎯 Inovação</h3>
                <p>
                  Estamos constantemente buscando novas formas de melhorar a experiência 
                  de viagem, utilizando tecnologia avançada e design intuitivo.
                </p>
              </Card>
              <Card>
                <h3>🤝 Comunidade</h3>
                <p>
                  Acreditamos no poder da comunidade. Conectamos viajantes, 
                  compartilhamos experiências e construímos uma rede global de exploradores.
                </p>
              </Card>
              <Card>
                <h3>🌍 Sustentabilidade</h3>
                <p>
                  Promovemos viagens responsáveis e sustentáveis, incentivando práticas 
                  que preservam os destinos para futuras gerações.
                </p>
              </Card>
              <Card>
                <h3>💡 Personalização</h3>
                <p>
                  Cada viajante é único. Nossas ferramentas se adaptam às preferências 
                  individuais, criando experiências verdadeiramente personalizadas.
                </p>
              </Card>
              <Card>
                <h3>🔒 Confiança</h3>
                <p>
                  A segurança e confiabilidade são fundamentais. Garantimos que cada 
                  interação seja segura e transparente.
                </p>
              </Card>
              <Card>
                <h3>🌟 Excelência</h3>
                <p>
                  Buscamos a excelência em tudo que fazemos, desde o atendimento ao 
                  cliente até a qualidade das recomendações.
                </p>
              </Card>
            </Grid>
          </Section>

          <Section>
            <h2>Nossa História</h2>
            <p>
              A Flya nasceu da paixão por viagens e da frustração com as limitações 
              das plataformas existentes. Fundada em 2024 por um grupo de desenvolvedores 
              e entusiastas de viagem, nossa empresa começou como um projeto pequeno 
              em Belo Horizonte, Minas Gerais.
            </p>
            <p>
              O que começou como uma solução local rapidamente evoluiu para uma 
              plataforma nacional, e hoje estamos expandindo nossos horizontes para 
              atender viajantes em todo o Brasil e, em breve, na América Latina.
            </p>
            <p>
              Nossa jornada é marcada por constantes inovações, feedback valioso de 
              nossa comunidade de usuários e um compromisso inabalável com a excelência 
              em tudo que fazemos.
            </p>
          </Section>

          <TeamSection>
            <h2>Nossa Equipe</h2>
            <p>
              Somos uma equipe diversificada de profissionais apaixonados por tecnologia, 
              design e viagens. Nossa expertise abrange desde desenvolvimento de software 
              até marketing digital e atendimento ao cliente.
            </p>
            <TeamGrid>
              <TeamMember>
                <h3>João Silva</h3>
                <p>CEO & Fundador</p>
              </TeamMember>
              <TeamMember>
                <h3>Maria Santos</h3>
                <p>CTO & Desenvolvedora</p>
              </TeamMember>
              <TeamMember>
                <h3>Pedro Costa</h3>
                <p>Designer UX/UI</p>
              </TeamMember>
              <TeamMember>
                <h3>Ana Oliveira</h3>
                <p>Marketing Digital</p>
              </TeamMember>
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
              <strong>Email:</strong> contato@flya.com.br<br />
              <strong>Telefone:</strong> (31) 99999-9999<br />
              <strong>Endereço:</strong> Belo Horizonte, MG, Brasil
            </p>
          </Section>
        </Content>
      </MainLayout>
    </Container>
  );
};

export default AboutUsPage; 