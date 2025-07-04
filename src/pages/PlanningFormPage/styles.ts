import styled from "styled-components";

export const PageContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[400]};
  margin-bottom: 3rem;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[300]};
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[700]};
  background-color: ${({ theme }) => theme.colors.gray[800]};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[700]};
  background-color: ${({ theme }) => theme.colors.gray[800]};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const FullWidthField = styled(FormGroup)`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: span 2;
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: none;
  background-color: ${({ theme }) => theme.colors.primary[600]};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  grid-column: span 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: span 2;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[700]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[600]};
    cursor: not-allowed;
  }
`;

export const ResultContainer = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[800]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: rgba(0, 0, 0, 0.2);
`;

export const ResultTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

export const PlanContent = styled.pre`
  white-space: pre-wrap; /* Permite que o texto quebre a linha */
  word-wrap: break-word;
  color: ${({ theme }) => theme.colors.gray[300]};
  line-height: 1.6;
  font-family: ${({ theme }) => theme.fonts.main};
`;
