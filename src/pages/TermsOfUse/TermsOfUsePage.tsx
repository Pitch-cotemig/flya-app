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
  max-width: 1000px;
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
  margin-bottom: 3rem;
  
  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: white;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    padding-bottom: 0.5rem;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 2rem 0 1rem 0;
    color: white;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    opacity: 0.95;
  }
  
  ul {
    margin: 1rem 0;
    padding-left: 2rem;
    
    li {
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 0.5rem;
      opacity: 0.95;
    }
  }
`;

const LastUpdated = styled.div`
  text-align: center;
  margin-top: 4rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  
  p {
    margin: 0;
    font-size: 1rem;
    opacity: 0.8;
  }
`;

const TermsOfUsePage: React.FC = () => {
  return (
    <Container>
      <MainLayout user={null}>
        <Content>
          <Header>
            <Logo>
              <img src={flyaLogo} alt="Flya" />
              <h1>Termos de Uso</h1>
            </Logo>
            <Subtitle>
              Leia atentamente estes termos antes de utilizar nossos serviços. 
              Ao acessar ou usar a Flya, você concorda em cumprir estes termos.
            </Subtitle>
          </Header>

          <Section>
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar a plataforma Flya, você aceita e concorda em cumprir 
              estes Termos de Uso. Se você não concordar com qualquer parte destes termos, 
              não deve usar nossos serviços.
            </p>
            <p>
              Estes termos constituem um acordo legal entre você e a Flya. Recomendamos 
              que você leia cuidadosamente todos os termos antes de usar nossa plataforma.
            </p>
          </Section>

          <Section>
            <h2>2. Descrição dos Serviços</h2>
            <p>
              A Flya é uma plataforma de planejamento de viagens que oferece:
            </p>
            <ul>
              <li>Ferramentas de planejamento de viagens personalizadas</li>
              <li>Sugestões de destinos baseadas em preferências</li>
              <li>Gestão de orçamento para viagens</li>
              <li>Comunidade de viajantes</li>
              <li>Informações sobre destinos e atrações</li>
              <li>Integração com serviços de reserva</li>
            </ul>
          </Section>

          <Section>
            <h2>3. Cadastro e Conta do Usuário</h2>
            <h3>3.1 Criação de Conta</h3>
            <p>
              Para usar certos recursos da plataforma, você deve criar uma conta. 
              Você é responsável por:
            </p>
            <ul>
              <li>Fornecer informações precisas e atualizadas</li>
              <li>Manter a confidencialidade de suas credenciais de login</li>
              <li>Notificar imediatamente sobre uso não autorizado de sua conta</li>
              <li>Ser responsável por todas as atividades em sua conta</li>
            </ul>

            <h3>3.2 Idade Mínima</h3>
            <p>
              Você deve ter pelo menos 13 anos para usar nossos serviços. 
              Usuários menores de 18 anos devem ter consentimento parental.
            </p>
          </Section>

          <Section>
            <h2>4. Uso Aceitável</h2>
            <p>
              Você concorda em usar nossos serviços apenas para propósitos legais e 
              de acordo com estes termos. É proibido:
            </p>
            <ul>
              <li>Usar os serviços para atividades ilegais</li>
              <li>Violar direitos de propriedade intelectual</li>
              <li>Transmitir conteúdo malicioso ou spam</li>
              <li>Tentar acessar sistemas sem autorização</li>
              <li>Interferir no funcionamento da plataforma</li>
              <li>Usar bots ou scripts automatizados sem permissão</li>
            </ul>
          </Section>

          <Section>
            <h2>5. Conteúdo do Usuário</h2>
            <h3>5.1 Propriedade do Conteúdo</h3>
            <p>
              Você mantém a propriedade do conteúdo que compartilha na plataforma. 
              Ao compartilhar conteúdo, você nos concede uma licença não exclusiva 
              para usar, reproduzir e distribuir esse conteúdo.
            </p>

            <h3>5.2 Responsabilidade pelo Conteúdo</h3>
            <p>
              Você é responsável por todo o conteúdo que compartilha. Não compartilhe 
              conteúdo que seja ilegal, ofensivo ou viole direitos de terceiros.
            </p>
          </Section>

          <Section>
            <h2>6. Privacidade e Proteção de Dados</h2>
            <p>
              Sua privacidade é importante para nós. O uso de suas informações pessoais 
              é regido por nossa Política de Privacidade, que faz parte destes termos.
            </p>
            <p>
              Coletamos e processamos dados pessoais conforme necessário para fornecer 
              nossos serviços, sempre em conformidade com a LGPD e outras leis aplicáveis.
            </p>
          </Section>

          <Section>
            <h2>7. Propriedade Intelectual</h2>
            <p>
              A Flya e todo o conteúdo da plataforma (incluindo, mas não se limitando a, 
              textos, gráficos, logos, ícones, imagens, clipes de áudio, downloads digitais 
              e compilações de dados) são propriedade da Flya ou de seus licenciadores.
            </p>
            <p>
              É proibido copiar, reproduzir, distribuir, transmitir, exibir, vender, 
              licenciar ou explorar comercialmente qualquer parte do conteúdo sem 
              permissão expressa por escrito.
            </p>
          </Section>

          <Section>
            <h2>8. Limitação de Responsabilidade</h2>
            <p>
              A Flya fornece seus serviços "como estão" e "conforme disponível". 
              Não garantimos que os serviços serão ininterruptos ou livres de erros.
            </p>
            <p>
              Em nenhuma circunstância a Flya será responsável por danos indiretos, 
              incidentais, especiais, consequenciais ou punitivos, incluindo perda 
              de lucros, dados ou uso.
            </p>
          </Section>

          <Section>
            <h2>9. Modificações dos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. 
              Mudanças significativas serão comunicadas através da plataforma ou por email.
            </p>
            <p>
              O uso continuado dos serviços após modificações constitui aceitação 
              dos novos termos.
            </p>
          </Section>

          <Section>
            <h2>10. Rescisão</h2>
            <p>
              Podemos suspender ou encerrar sua conta a qualquer momento, por qualquer 
              motivo, incluindo violação destes termos.
            </p>
            <p>
              Você pode encerrar sua conta a qualquer momento através das configurações 
              da plataforma ou entrando em contato conosco.
            </p>
          </Section>

          <Section>
            <h2>11. Lei Aplicável</h2>
            <p>
              Estes termos são regidos pelas leis brasileiras. Qualquer disputa será 
              resolvida nos tribunais da comarca de Belo Horizonte, MG.
            </p>
          </Section>

          <Section>
            <h2>12. Contato</h2>
            <p>
              Se você tiver dúvidas sobre estes termos, entre em contato conosco:
            </p>
            <p>
              <strong>Email:</strong> legal@flya.com.br<br />
              <strong>Telefone:</strong> (31) 99999-9999<br />
              <strong>Endereço:</strong> Belo Horizonte, MG, Brasil
            </p>
          </Section>

          <LastUpdated>
            <p>
              <strong>Última atualização:</strong> 15 de Janeiro de 2024
            </p>
          </LastUpdated>
        </Content>
      </MainLayout>
    </Container>
  );
};

export default TermsOfUsePage; 