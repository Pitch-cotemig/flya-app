import styled from 'styled-components';

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.custom.darkBlue};
  color: ${({ theme }) => theme.colors.white};
  padding-top: 7rem;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 4rem 1rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 4rem 1.5rem;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 6rem 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 48rem;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.main};
`;

const LastUpdated = styled.p`
  margin-top: 1rem;
  text-align: center;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.gray[300]};
  font-family: ${({ theme }) => theme.fonts.main};
`;

const ContentSection = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: ${({ theme }) => theme.colors.gray[300]};
  font-size: 1.125rem;
  line-height: 1.75;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.main};
`;

const SectionText = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
`;

export default function TermsOfUsePage() {
  return (
    <PageContainer>
      <Container>
        <ContentWrapper>
          <PageTitle>
            Termos de Uso
          </PageTitle>
          <LastUpdated>
            Última atualização: 30 de Junho de 2025
          </LastUpdated>

          <ContentSection>
            <SectionTitle>1. Aceitação dos Termos</SectionTitle>
            <SectionText>
              Ao acessar e usar os serviços da Flya ("Nós", "Nosso"), você concorda em cumprir e
              estar vinculado aos seguintes termos e condições. Se você não concorda com estes
              termos, por favor, não use nossos serviços.
            </SectionText>

            <SectionTitle>2. Descrição do Serviço</SectionTitle>
            <SectionText>
              A Flya fornece uma plataforma de planejamento de viagens assistida por inteligência
              artificial para ajudar os usuários a criar, gerenciar e otimizar seus roteiros de
              viagem, orçamentos e reservas.
            </SectionText>

            <SectionTitle>3. Contas de Usuário</SectionTitle>
            <SectionText>
              Para acessar certos recursos, você pode ser solicitado a criar uma conta. Você é
              responsável por manter a confidencialidade de sua senha e por todas as
              atividades que ocorrem em sua conta.
            </SectionText>

            <SectionTitle>4. Limitação de Responsabilidade</SectionTitle>
            <SectionText>
              A Flya não se responsabiliza por quaisquer imprecisões nas informações de viagem,
              problemas com reservas feitas através de terceiros, ou quaisquer perdas ou danos
              incorridos durante sua viagem. Nosso serviço é uma ferramenta de auxílio, e a
              verificação final das informações é de responsabilidade do usuário.
            </SectionText>

            <SectionTitle>5. Modificações nos Termos</SectionTitle>
            <SectionText>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. Notificaremos
              os usuários sobre quaisquer alterações, e o uso contínuo do serviço após tais
              alterações constituirá seu consentimento para com os novos termos.
            </SectionText>
          </ContentSection>
        </ContentWrapper>
      </Container>
    </PageContainer>
  );
} 