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
    margin: 0;
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

const TermsOfUsePage: React.FC = () => {
  return (
    <Container>
      <Content>
        <Header>
          <Logo>
            <img src={flyaLogo} alt="Flya" />
            <h1>Termo de Uso do Sistema "FLYA"</h1>
          </Logo>
          <Subtitle>
            Este Termo de Uso é um acordo legal entre você, o(a) usuário(a) do
            sistema "FLYA", e os desenvolvedores do Projeto "FLYA", um sistema
            pensado para planejar viagens utilizando inteligência artificial.
          </Subtitle>
        </Header>

        <Section>
          <HighlightBox>
            <p>
              <strong>Ao acessar ou utilizar o "FLYA"</strong>, você manifesta
              sua concordância integral com este Termo de Uso, com a Política de
              Privacidade e com a Lei Geral de Proteção de Dados Pessoais (LGPD
              – Lei nº 13.709/2018). Se você não concordar com estes termos, não
              deverá utilizar o sistema.
            </p>
          </HighlightBox>
        </Section>

        <Section>
          <h2>Cláusula Primeira – Das Condições Gerais de Uso</h2>
          <p>
            O "FLYA" é destinado a{" "}
            <strong>
              PLANEJAR VIAGENS UTILIZANDO INTELIGÊNCIA ARTIFICIAL ENCONTRANDO
              DESTINOS, ATIVIDADES E LOCALIZAÇÕES QUE SÃO RECOMENDADAS COM BASE
              NAS PREFERÊNCIAS DO USUÁRIO
            </strong>
            .
          </p>
        </Section>

        <Section>
          <h2>Cláusula Segunda – Da Coleta e Uso de Dados Pessoais</h2>
          <p>
            O usuário declara estar ciente da coleta e uso dos seguintes dados
            pelo "FLYA", que visam exclusivamente planejar viagens utilizando
            inteligência artificial com base nas preferências do usuário:
          </p>
          <ul>
            <li>Nome de usuário</li>
            <li>Primeiro nome</li>
            <li>Sobrenome</li>
            <li>E-mail</li>
            <li>Data de nascimento</li>
            <li>Senha</li>
          </ul>
        </Section>

        <Section>
          <h2>Cláusula Terceira – Finalidade da Coleta</h2>
          <p>
            A coleta dos dados mencionados têm finalidades específicas e
            essenciais para a operação do "FLYA" e a conformidade com a LGPD:
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
        </Section>

        <Section>
          <h2>Cláusula Quarta – Vedações do Uso</h2>
          <p>
            O usuário compromete-se a não utilizar o "FLYA" para qualquer
            finalidade ilícita ou que viole este Termo de Uso, incluindo:
          </p>
          <ul>
            <li>
              Carregar conteúdo ilegal, difamatório, obsceno ou prejudicial.
            </li>
            <li>Acessar, alterar ou danificar contas de outros usuários.</li>
            <li>
              Violar direitos de propriedade intelectual ou outros direitos de
              terceiros.
            </li>
          </ul>
        </Section>

        <Section>
          <h2>Cláusula Quinta – Aceitação Implícita</h2>
          <p>
            O uso do Sistema "FLYA" implica em concordância integral e
            incondicional com este Termo de Uso.
          </p>
        </Section>

        <Section>
          <h2>Cláusula Sexta – Da Proteção dos Dados</h2>
          <p>
            O "FLYA" compromete-se a adotar medidas técnicas e administrativas
            em conformidade com a LGPD e normas ISO/IEC 27001, 27701 e 29100:
          </p>
          <ul>
            <li>Criptografia dos arquivos armazenados.</li>
            <li>
              Banco de dados seguro, com autenticação robusta e acesso restrito.
            </li>
            <li>
              Políticas de segurança da informação e plano de resposta a
              incidentes.
            </li>
          </ul>
        </Section>

        <Section>
          <h2>Cláusula Sétima – Do Compartilhamento de Dados</h2>
          <p>
            Os dados armazenados não serão compartilhados com terceiros, exceto
            para armazenamento no banco de dados Supabase e:
          </p>
          <ul>
            <li>Quando autorizado expressamente pelo titular.</li>
            <li>Mediante obrigação legal ou ordem judicial.</li>
            <li>Para auxílio técnico restrito e necessário.</li>
          </ul>
        </Section>

        <Section>
          <h2>Cláusula Oitava – Dos Direitos do Titular dos Dados</h2>
          <p>
            Em conformidade com a LGPD, o sistema deve permitir ao usuário
            exercer seus direitos, incluindo:
          </p>
          <ul>
            <li>Exclusão da conta e dos arquivos.</li>
            <li>Revogação do consentimento a qualquer momento.</li>
            <li>Solicitação de informações sobre o uso de seus dados.</li>
          </ul>
          <ContactBox>
            <p>
              <strong>Canal de contato:</strong>{" "}
              flya.corporation.dados@gmail.com
            </p>
          </ContactBox>
        </Section>

        <Section>
          <h2>
            Cláusula Nona – Da Identificação do Responsável pelo Tratamento dos
            Dados
          </h2>
          <p>
            O Projeto "FLYA" é responsável pelo tratamento dos dados e indica
            formalmente o Encarregado de Dados (DPO):
          </p>
          <HighlightBox>
            <p>
              <strong>Bernardo Orsi do Amaral</strong> – Encarregado de Proteção
              de Dados – CPF: 727.401.860-45
            </p>
          </HighlightBox>
        </Section>

        <Section>
          <h2>Cláusula Décima – Da Responsabilidade na Exatidão dos Dados</h2>
          <p>
            O usuário é responsável pela exatidão, veracidade e atualização dos
            dados fornecidos e documentos carregados.
          </p>
          <p>
            O "FLYA" não se responsabiliza por inconsistências inseridas pelo
            usuário.
          </p>
        </Section>

        <Section>
          <h2>Cláusula Décima Primeira – Da Transparência</h2>
          <p>
            O "FLYA" garante a transparência sobre o tratamento dos dados
            pessoais.
          </p>
          <p>
            Os direitos dos usuários serão atendidos em até{" "}
            <strong>48 horas</strong> para confirmação e até{" "}
            <strong>15 dias</strong> para demandas complexas.
          </p>
        </Section>

        <Section>
          <h2>
            Cláusula Décima Segunda – Do Tratamento de Dados de Crianças e
            Adolescentes
          </h2>
          <p>
            O "FLYA" observa as disposições do art. 14 da LGPD, quando
            aplicáveis, quanto ao tratamento de dados de crianças e
            adolescentes, adotando os seguintes princípios:
          </p>
          <ul>
            <li>
              Tratamento de dados pessoais de{" "}
              <strong>crianças (menores de 12 anos)</strong> somente ocorrerá
              mediante consentimento específico e em destaque dado por pelo
              menos um dos pais ou responsável legal.
            </li>
            <li>
              Tratamento de dados pessoais de{" "}
              <strong>
                adolescentes (maiores de 12 anos e menores de 18 anos)
              </strong>{" "}
              será realizado de forma prioritária no seu melhor interesse,
              garantindo segurança, privacidade e respeito ao desenvolvimento.
            </li>
            <li>
              O sistema compromete-se a manter controles técnicos e
              administrativos adequados, de acordo com a LGPD e com as normas
              ISO/IEC 27701, para assegurar a confidencialidade, integridade e
              uso responsável das informações de crianças e adolescentes.
            </li>
            <li>
              O consentimento dos responsáveis poderá ser verificado por
              mecanismos de autenticação digital, e estes poderão revogar a
              autorização a qualquer momento.
            </li>
          </ul>
        </Section>

        <Section>
          <h2>Cláusula Décima Terceira – Disposições Gerais</h2>
          <p>
            O presente Termo pode ser atualizado periodicamente para refletir
            mudanças legais ou operacionais.
          </p>
          <p>
            Este Termo é regido pela <strong>legislação brasileira</strong> e
            pela <strong>LGPD</strong>.
          </p>
        </Section>

        <LastUpdated>
          <p>
            <strong>Última atualização:</strong> 15 de Janeiro de 2025
          </p>
        </LastUpdated>
      </Content>
    </Container>
  );
};

export default TermsOfUsePage;
