import React from "react";
import styled from "styled-components";
import flyaLogo from "../../assets/flyalogo.svg";

const Container = styled.div`
  min-height: 100vh;
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
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    text-align: center;
    line-height: 1.3;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    h1 {
      font-size: 2rem;
    }
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 3rem;

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: white;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    padding-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin: 1.5rem 0 1rem 0;
    color: rgba(255, 255, 255, 0.95);
  }

  p {
    font-size: 1.05rem;
    line-height: 1.8;
    margin-bottom: 1.2rem;
    opacity: 0.95;
    text-align: justify;
  }

  ul {
    margin: 1rem 0 1.5rem 0;
    padding-left: 2.5rem;

    li {
      font-size: 1.05rem;
      line-height: 1.8;
      margin-bottom: 0.8rem;
      opacity: 0.95;
    }
  }

  ol {
    margin: 1rem 0 1.5rem 0;
    padding-left: 2.5rem;

    li {
      font-size: 1.05rem;
      line-height: 1.8;
      margin-bottom: 0.8rem;
      opacity: 0.95;
    }
  }

  strong {
    color: white;
    font-weight: 600;
  }
`;

const HighlightBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-left: 4px solid rgba(255, 255, 255, 0.5);
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 8px;

  p {
    margin-bottom: 0.8rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const DataTable = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;

  table {
    width: 100%;
    border-collapse: collapse;

    tr {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      &:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: 1rem;
      font-size: 1.05rem;
      line-height: 1.6;

      &:first-child {
        font-weight: 600;
        color: white;
        width: 35%;
        vertical-align: top;
      }

      &:last-child {
        opacity: 0.9;
      }
    }
  }

  @media (max-width: 768px) {
    table {
      td {
        display: block;
        width: 100%;
        padding: 0.5rem;

        &:first-child {
          padding-top: 1rem;
          padding-bottom: 0.25rem;
        }

        &:last-child {
          padding-bottom: 1rem;
        }
      }
    }
  }
`;

const ContactBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  text-align: center;

  p {
    font-size: 1.1rem;
    margin: 0.5rem 0;
    text-align: center;
  }

  strong {
    color: white;
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
    text-align: center;
  }
`;

const ConsentTermPage: React.FC = () => {
  return (
    <Container>
      <Content>
        <Header>
          <Logo>
            <img src={flyaLogo} alt="Flya" />
            <h1>Termo de Consentimento para Tratamento de Dados Pessoais</h1>
          </Logo>
          <Subtitle>
            Este Termo de Consentimento formaliza sua autorização expressa,
            livre, informada e inequívoca para o tratamento de seus dados
            pessoais pelo Projeto "FLYA", em conformidade com a Lei nº
            13.709/2018 – Lei Geral de Proteção de Dados (LGPD).
          </Subtitle>
        </Header>

        <Section>
          <HighlightBox>
            <p>
              O consentimento do titular é uma das bases legais para o
              tratamento de dados pessoais, conforme o art. 7º, I, da LGPD,
              devendo ser registrado e mantido como evidência pelo Projeto
              "FLYA".
            </p>
            <p>
              <strong>
                Ao utilizar o sistema, o titular declara ter lido, compreendido
                e consentido expressamente com o tratamento de seus dados
                pessoais
              </strong>
              , nos termos a seguir:
            </p>
          </HighlightBox>
        </Section>

        <Section>
          <h2>
            Cláusula Primeira – Do Objeto do Consentimento e dos Dados Tratados
          </h2>
          <p>
            O titular <strong>AUTORIZA</strong> o Projeto "FLYA" a tratar os
            seguintes dados pessoais:
          </p>
          <DataTable>
            <table>
              <tbody>
                <tr>
                  <td>Nome de usuário</td>
                  <td>
                    Identificação única na plataforma e personalização da
                    experiência do usuário
                  </td>
                </tr>
                <tr>
                  <td>Primeiro nome</td>
                  <td>
                    Personalização da comunicação e identificação pessoal do
                    usuário
                  </td>
                </tr>
                <tr>
                  <td>Sobrenome</td>
                  <td>
                    Complemento da identificação pessoal e formalização do
                    cadastro
                  </td>
                </tr>
                <tr>
                  <td>E-mail</td>
                  <td>
                    Comunicação oficial, recuperação de conta, notificações e
                    suporte técnico
                  </td>
                </tr>
                <tr>
                  <td>Data de nascimento</td>
                  <td>
                    Verificação de idade mínima, adequação de conteúdo à faixa
                    etária e cumprimento legal
                  </td>
                </tr>
                <tr>
                  <td>Senha</td>
                  <td>
                    Autenticação segura e proteção da conta contra acessos não
                    autorizados
                  </td>
                </tr>
              </tbody>
            </table>
          </DataTable>
          <HighlightBox>
            <p>
              <strong>Atenção:</strong> Ainda que não haja coleta direta de
              dados sensíveis, estes podem estar contidos nos documentos
              armazenados. Nestes casos, o "FLYA" compromete-se a adotar
              medidas reforçadas de segurança e governança em conformidade com a
              LGPD e a ISO/IEC 27701.
            </p>
          </HighlightBox>
        </Section>

        <Section>
          <h2>Cláusula Segunda – Das Finalidades do Tratamento</h2>
          <p>
            Os dados pessoais serão utilizados exclusivamente para:
          </p>
          <ol>
            <li>
              Armazenamento seguro e organização de documentos dos usuários no
              banco de dados Supabase.
            </li>
            <li>Contato com o usuário e suporte técnico via e-mail.</li>
            <li>
              Segurança e auditoria do sistema, com logs de data/hora e
              informações técnicas para prevenir fraudes e incidentes.
            </li>
          </ol>
        </Section>

        <Section>
          <h2>Cláusula Terceira – Do Não Compartilhamento de Dados</h2>
          <p>
            Os dados não serão compartilhados com terceiros sem consentimento
            expresso do titular, exceto em casos de obrigação legal ou para
            suporte técnico realizado por profissionais vinculados ao projeto.
          </p>
          <p>
            Qualquer eventual compartilhamento seguirá o princípio da
            necessidade e adotará garantias técnicas e contratuais previstas na
            ISO/IEC 27001.
          </p>
        </Section>

        <Section>
          <h2>
            Cláusula Quarta – Da Identificação do Controlador e do Encarregado
            (DPO)
          </h2>
          <p>
            O titular terá acesso às informações de contato do Controlador e do
            Encarregado de Dados (DPO), conforme exigido pelo art. 41 da LGPD.
          </p>
        </Section>

        <Section>
          <h2>
            Cláusula Quinta – Da Conformidade com a LGPD e com as Normas ISO
          </h2>
          <p>
            O tratamento observará os princípios da LGPD e estará alinhado às
            boas práticas de governança em privacidade, conforme as normas
            ISO/IEC 27001, ISO/IEC 27701 e ISO/IEC 29100.
          </p>
          <p>Entre as medidas aplicadas:</p>
          <ul>
            <li>Criptografia</li>
            <li>Controle de acesso restrito</li>
            <li>Monitoramento de logs</li>
            <li>Anonimização sempre que possível</li>
            <li>Políticas internas de confidencialidade</li>
            <li>Planos de resposta a incidentes</li>
          </ul>
        </Section>

        <Section>
          <h2>Cláusula Sexta – Dos Direitos do Titular</h2>
          <p>
            O titular poderá, a qualquer momento, mediante solicitação:
          </p>
          <ul>
            <li>Revogar seu consentimento.</li>
            <li>
              Solicitar a exclusão de seus dados pessoais e documentos
              armazenados.
            </li>
            <li>Solicitar acesso, cópia, correção ou atualização de dados.</li>
            <li>
              Solicitar informações sobre a finalidade e forma de tratamento de
              seus dados.
            </li>
            <li>Requerer a portabilidade dos dados, quando aplicável.</li>
          </ul>
        </Section>

        <Section>
          <h2>Cláusula Sétima – Canal de Comunicação</h2>
          <p>
            Canal oficial para dúvidas, solicitações e exercício de direitos do
            titular:
          </p>
          <ContactBox>
            <p>
              <strong>Bernardo Orsi do Amaral</strong>
            </p>
            <p>
              <strong>E-mail:</strong> flya.corporation@gmail.com
            </p>
            <p>
              <strong>Telefone:</strong> (31) 99954-5104
            </p>
          </ContactBox>
        </Section>

        <Section>
          <h2>Cláusula Oitava – Da Identificação do Encarregado (DPO)</h2>
          <p>
            Projeto "FLYA" indica como Encarregado de Proteção de Dados (DPO):
          </p>
          <HighlightBox>
            <p>
              <strong>Bernardo Orsi do Amaral</strong> – Encarregado de Proteção
              de Dados
            </p>
            <p>
              <strong>CPF:</strong> 727.401.860-45
            </p>
            <p>
              <strong>E-mail:</strong> flya.corporation.dados@gmail.com
            </p>
          </HighlightBox>
        </Section>

        <Section>
          <h2>
            Cláusula Nona – Do Consentimento Livre, Informado e Inequívoco
          </h2>
          <p>
            O titular confirma que o consentimento foi concedido de forma livre,
            sem coação, após leitura e compreensão integral deste Termo.
          </p>
        </Section>

        <Section>
          <h2>
            Cláusula Décima – Do Tratamento de Dados de Crianças e Adolescentes
          </h2>
          <p>
            O "FLYA" observa rigorosamente o disposto no art. 14 da LGPD, quando
            aplicáveis, e adota medidas específicas para proteger os dados
            pessoais de crianças e adolescentes:
          </p>
          <ul>
            <li>
              O tratamento de dados de <strong>crianças menores de 12 anos</strong> será
              realizado exclusivamente mediante consentimento específico e em
              destaque de pelo menos um dos pais ou responsável legal.
            </li>
            <li>
              O tratamento de dados de <strong>adolescentes (12 a 18 anos)</strong> ocorrerá
              sempre no melhor interesse do titular, respeitando sua privacidade,
              desenvolvimento e dignidade.
            </li>
            <li>
              Serão adotadas medidas técnicas e administrativas reforçadas para
              garantir a confidencialidade e integridade desses dados, incluindo:
              <ul>
                <li>Criptografia de informações armazenadas.</li>
                <li>
                  Controle de acesso restrito e diferenciado para dados de
                  menores.
                </li>
                <li>
                  Monitoramento contínuo para evitar uso inadequado ou
                  compartilhamento indevido.
                </li>
              </ul>
            </li>
            <li>
              O consentimento dos responsáveis poderá ser revogado a qualquer
              momento mediante solicitação formal, assegurando o pleno exercício
              dos direitos do titular e de seus representantes legais.
            </li>
          </ul>
        </Section>

        <Section>
          <h2>Cláusula Décima Primeira – Disposições Gerais</h2>
          <p>
            Este Termo é regido pela LGPD (Lei nº 13.709/2018) e observa
            diretrizes internacionais de segurança da informação e privacidade.
          </p>
        </Section>

        <LastUpdated>
          <p>
            <strong>Última atualização:</strong> 24 de Outubro de 2025
          </p>
        </LastUpdated>
      </Content>
    </Container>
  );
};

export default ConsentTermPage;
