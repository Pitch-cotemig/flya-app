import { useState } from "react";
import { Bot } from "lucide-react";
import {
  PageContainer,
  Title,
  Subtitle,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  FullWidthField,
  SubmitButton,
  ResultContainer,
  ResultTitle,
  PlanContent,
} from "./styles";

// --- Component ---
export function PlanningFormPage() {
  const [formData, setFormData] = useState({
    destino: "",
    duracao: "7",
    estilo: "Equilibrado (Cultura e Lazer)",
    orcamento: "Moderado",
    preferencias: "",
  });
  const [generatedPlan, setGeneratedPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedPlan("");
    setError("");

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Falha na requisição para a API.");
      }

      const data = await response.json();
      setGeneratedPlan(data.plan);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocorreu um erro desconhecido."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <Title>Planejador de Viagens IA</Title>
      <Subtitle>
        Preencha os campos abaixo e deixe a nossa inteligência artificial criar
        o roteiro dos seus sonhos.
      </Subtitle>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="destino">Qual o seu destino?</Label>
          <Input
            type="text"
            name="destino"
            id="destino"
            value={formData.destino}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="duracao">Duração da viagem (em dias)?</Label>
          <Input
            type="number"
            name="duracao"
            id="duracao"
            value={formData.duracao}
            onChange={handleChange}
            min="1"
            required
          />
        </FormGroup>
        <FullWidthField>
          <Label htmlFor="estilo">Qual o estilo da sua viagem?</Label>
          <Input
            type="text"
            name="estilo"
            id="estilo"
            value={formData.estilo}
            onChange={handleChange}
          />
        </FullWidthField>
        <FullWidthField>
          <Label htmlFor="orcamento">Qual o seu orçamento?</Label>
          <Input
            type="text"
            name="orcamento"
            id="orcamento"
            value={formData.orcamento}
            onChange={handleChange}
          />
        </FullWidthField>
        <FullWidthField>
          <Label htmlFor="preferencias">
            Tem alguma preferência extra? (Ex: museus, praias, vida noturna)
          </Label>
          <TextArea
            name="preferencias"
            id="preferencias"
            value={formData.preferencias}
            onChange={handleChange}
          />
        </FullWidthField>
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? (
            "Gerando Roteiro..."
          ) : (
            <>
              {" "}
              <Bot size={20} /> Gerar Plano de Viagem{" "}
            </>
          )}
        </SubmitButton>
      </Form>

      {error && (
        <ResultContainer>
          <p style={{ color: "red" }}>{error}</p>
        </ResultContainer>
      )}

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
