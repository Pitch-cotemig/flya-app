import { useState } from "react";
import styled from "styled-components";
import { Bot } from "lucide-react";

// --- Styled Components ---
const PageContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[400]};
  margin-bottom: 3rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[300]};
`;

const Input = styled.input`
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

const TextArea = styled.textarea`
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

const FullWidthField = styled(FormGroup)`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: span 2;
  }
`;

const SubmitButton = styled.button`
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

const ResultContainer = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[800]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: rgba(0,0,0, 0.2);
`;

const ResultTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const PlanContent = styled.pre`
  white-space: pre-wrap; /* Permite que o texto quebre a linha */
  word-wrap: break-word;
  color: ${({ theme }) => theme.colors.gray[300]};
  line-height: 1.6;
  font-family: ${({ theme }) => theme.fonts.main};
`;

// --- Component ---
export function PlanningFormPage() {
  const [formData, setFormData] = useState({
    destino: '',
    duracao: '7',
    estilo: 'Equilibrado (Cultura e Lazer)',
    orcamento: 'Moderado',
    preferencias: '',
  });
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedPlan('');
    setError('');

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Falha na requisição para a API.');
      }
      
      const data = await response.json();
      setGeneratedPlan(data.plan);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <Title>Planejador de Viagens IA</Title>
      <Subtitle>Preencha os campos abaixo e deixe a nossa inteligência artificial criar o roteiro dos seus sonhos.</Subtitle>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="destino">Qual o seu destino?</Label>
          <Input type="text" name="destino" id="destino" value={formData.destino} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="duracao">Duração da viagem (em dias)?</Label>
          <Input type="number" name="duracao" id="duracao" value={formData.duracao} onChange={handleChange} min="1" required />
        </FormGroup>
        <FullWidthField>
          <Label htmlFor="estilo">Qual o estilo da sua viagem?</Label>
          <Input type="text" name="estilo" id="estilo" value={formData.estilo} onChange={handleChange} />
        </FullWidthField>
        <FullWidthField>
          <Label htmlFor="orcamento">Qual o seu orçamento?</Label>
          <Input type="text" name="orcamento" id="orcamento" value={formData.orcamento} onChange={handleChange} />
        </FullWidthField>
        <FullWidthField>
          <Label htmlFor="preferencias">Tem alguma preferência extra? (Ex: museus, praias, vida noturna)</Label>
          <TextArea name="preferencias" id="preferencias" value={formData.preferencias} onChange={handleChange} />
        </FullWidthField>
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Gerando Roteiro...' : <> <Bot size={20} /> Gerar Plano de Viagem </>}
        </SubmitButton>
      </Form>

      {error && <ResultContainer><p style={{color: 'red'}}>{error}</p></ResultContainer>}
      
      {generatedPlan && (
        <ResultContainer>
          <ResultTitle>Seu Roteiro Personalizado ✨</ResultTitle>
          <PlanContent>{generatedPlan}</PlanContent>
        </ResultContainer>
      )}
    </PageContainer>
  );
}

export default PlanningFormPage; 