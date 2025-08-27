import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  FormContainer,
  CloseButton,
  InitialScreenContainer,
  ContinueButton,
  BackButton,
  NavigationButtons,
  StepIndicator,
  StepDot,
  StepLine,
  StepText,
  LoadingContainer,
} from "./styles";
import Step1 from "../../components/PlanningForm/Step1";
import Step2 from "../../components/PlanningForm/Step2";
import Step3 from "../../components/PlanningForm/Step3";
import Step4 from "../../components/PlanningForm/Step4";
import FinalStep from "../../components/PlanningForm/FinalStep";

interface TripData {
  prompt_data: object;
  ai_prompt: string;
  plan_result: string;
}

// Definindo a estrutura dos dados do formulário
interface IFormData {
  motivo: string;
  destino: string;
  pet: string;
  orcamento: string;
  acompanhantes: string;
  transporte: string;
  clima: string[]; // Array para as checkboxes
}

export function PlanningFormPage() {
  const [step, setStep] = useState(0); // 0: Tela inicial, 1-4: Passos, 5: Tela final
  const [formData, setFormData] = useState<IFormData>({
    motivo: "",
    destino: "",
    pet: "",
    orcamento: "",
    acompanhantes: "",
    transporte: "",
    clima: [],
  });
  const [loadingStep, setLoadingStep] = useState(0);
  const [generatedPlan, setGeneratedPlan] = useState<TripData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const loadingSteps = [
    'Analisando suas preferências...',
    'Personalizando roteiro...',
    'Calculando melhores opções...',
    'Finalizando planejamento...'
  ];
  const navigate = useNavigate();

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);
  const handleSaveSuccess = () => {
    navigate("/minhas-viagens");
  };
  const handleClose = () => navigate("/"); // Volta para a Home ao fechar

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        clima: checked
          ? [...prev.clima, value]
          : prev.clima.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name as keyof Omit<IFormData, "clima">]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setLoadingStep(0);

    // Simular etapas de loading
    for (let i = 0; i < loadingSteps.length; i++) {
      setLoadingStep(i);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    const prompt = buildPrompt(formData);

    try {
      const response = await fetch('http://localhost:3000/planning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // TODO: Adicionar token de autenticação se a rota for privada
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar os dados do planejamento.');
      }

      const result = await response.json();
      console.log('Resposta do backend:', result);

      // Armazenar tudo para a próxima tela
      setGeneratedPlan({
        prompt_data: formData,
        ai_prompt: prompt,
        plan_result: result.plan,
      });

      handleNextStep();
    } catch (error) {
      console.error('Erro no handleSubmit:', error);
      // TODO: Mostrar um erro para o usuário na UI
    } finally {
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  // Helper para construir o prompt (pode ser movido para um utilitário depois)
  const buildPrompt = (data: IFormData) => {
    // Lógica do buildPrompt do backend, replicada aqui para ter acesso ao prompt
    let promptParts: string[] = [];
    promptParts.push(
      `Planeje um roteiro de viagem com as seguintes características:`
    );
    promptParts.push(`- Motivo da Viagem: ${data.motivo}.`);
    promptParts.push(`- Tipo de Destino: ${data.destino}.`);
    if (data.pet === "Sim") promptParts.push(`- O viajante levará um pet.`);
    promptParts.push(`- Orçamento: ${data.orcamento}.`);
    promptParts.push(`- Número de Acompanhantes: ${data.acompanhantes}.`);
    if (data.transporte !== "Não")
      promptParts.push(
        `- Preferência de Transporte: ${data.transporte.replace("Sim, ", "")}.`
      );
    if (data.clima.length > 0)
      promptParts.push(`- Preferência de Clima: ${data.clima.join(", ")}.`);
    promptParts.push(
      `\nCrie um roteiro detalhado dia a dia baseado nessas informações.`
    );
    return promptParts.join("\n");
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData} handleChange={handleChange} />;
      case 2:
        return <Step2 formData={formData} handleChange={handleChange} />;
      case 3:
        return <Step3 formData={formData} handleChange={handleChange} />;
      case 4:
        return <Step4 formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return !formData.motivo || !formData.destino;
      case 2:
        return !formData.pet || !formData.orcamento;
      case 3:
        return !formData.acompanhantes || !formData.transporte;
      case 4:
        return formData.clima.length === 0;
      default:
        return true;
    }
  };

  if (step === 0) {
    return (
      <PageContainer>
        <FormContainer>
          <InitialScreenContainer>
            <h1>Partiu Viajar!</h1>
            <p>Descubra seu roteiro de viagem personalizado em poucos passos</p>

            <div className="features">
              <div className="feature">
                <span className="icon">🎯</span>
                <div className="title">Personalizado</div>
                <div className="description">Roteiro feito sob medida para você</div>
              </div>
              <div className="feature">
                <span className="icon">⚡</span>
                <div className="title">Rápido</div>
                <div className="description">Planejamento completo em minutos</div>
              </div>
              <div className="feature">
                <span className="icon">💎</span>
                <div className="title">Premium</div>
                <div className="description">Experiência única e memorável</div>
              </div>
            </div>

            <ContinueButton onClick={handleNextStep}>
              Começar Minha Jornada ✨
            </ContinueButton>
          </InitialScreenContainer>
        </FormContainer>
      </PageContainer>
    );
  }

  if (isLoading) {
    return (
      <PageContainer>
        <FormContainer>
          <LoadingContainer>
            <div className="loading-icon">✈️</div>
            <div className="loading-spinner"></div>
            <div className="loading-title">Criando seu Roteiro dos Sonhos</div>
            <div className="loading-subtitle">
              {loadingSteps[loadingStep] || 'Preparando tudo para você...'}
            </div>

            <div className="loading-steps">
              {loadingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`step ${index < loadingStep ? 'completed' : ''} ${index === loadingStep ? 'active' : ''}`}
                >
                  <span className="step-icon">
                    {index < loadingStep ? '✅' : index === loadingStep ? '🔄' : '⏳'}
                  </span>
                  <span className="step-text">{step}</span>
                </div>
              ))}
            </div>
          </LoadingContainer>
        </FormContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <FormContainer>
        <CloseButton onClick={handleClose}>&times;</CloseButton>

        {step > 0 && step < 5 && (
          <StepIndicator>
            {[1, 2, 3, 4].map((stepNumber, index) => (
              <React.Fragment key={stepNumber}>
                <StepDot
                  active={step === stepNumber}
                  completed={step > stepNumber}
                />
                {index < 3 && (
                  <StepLine completed={step > stepNumber} />
                )}
              </React.Fragment>
            ))}
            <StepText>Passo {step} de 4</StepText>
          </StepIndicator>
        )}

        {renderStepContent()}

        {step > 0 && step < 5 && (
          <NavigationButtons>
            <BackButton onClick={handlePrevStep}>Voltar</BackButton>
            {step === 4 ? (
              <ContinueButton
                onClick={handleSubmit}
                disabled={isNextDisabled() || isLoading}
              >
                {isLoading ? "Gerando..." : "Finalizar"}
              </ContinueButton>
            ) : (
              <ContinueButton
                onClick={handleNextStep}
                disabled={isNextDisabled()}
              >
                Continuar
              </ContinueButton>
            )}
          </NavigationButtons>
        )}
      </FormContainer>
    </PageContainer>
  );
}

export default PlanningFormPage;
