import styled from "styled-components";

const PageContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

const Subtitle = styled.p`
  margin-top: 1rem;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.gray[400]};
`;

export function BagPage() {
  return (
    <PageContainer>
      <Title>Minha Mala</Title>
      <Subtitle>Esta página está em construção!</Subtitle>
    </PageContainer>
  );
}

export default BagPage; 