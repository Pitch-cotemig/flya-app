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
  FloatingElements,
  DecorativeElements,
  StepContainer,
} from "./styles";
import Step1 from "../../components/PlanningForm/Step1";
import Step2 from "../../components/PlanningForm/Step2";
import Step3 from "../../components/PlanningForm/Step3";
import Step4 from "../../components/PlanningForm/Step4";
import {
  Plane,
  Clock,
  Target,
  Zap,
  Sparkles,
  Lightbulb,
  CheckCircle,
  Loader,
  Wand2,
} from "lucide-react";
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
  destinoEspecifico: string;
  pet: string;
  orcamento: string;
  dias: string;
  acompanhantes: string;
  transporte: string;
  clima: string[]; // Array para as checkboxes
}

export function PlanningFormPage() {
  const [step, setStep] = useState(0); // 0: Tela inicial, 1-4: Passos, 5: Tela final
  const [formData, setFormData] = useState<IFormData>({
    motivo: "",
    destino: "",
    destinoEspecifico: "",
    pet: "",
    orcamento: "",
    dias: "",
    acompanhantes: "",
    transporte: "",
    clima: [],
  });
  const [loadingStep, setLoadingStep] = useState(0);
  const [generatedPlan, setGeneratedPlan] = useState<TripData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const loadingSteps = [
    " Analisando suas preferências...",
    " Personalizando roteiro...",
    " Calculando melhores opções...",
    " Finalizando planejamento mágico...",
  ];
  const navigate = useNavigate();

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };
  const handlePrevStep = () => setStep((prev) => prev - 1);
  const handleSaveSuccess = () => {
    navigate("/Minhas-Viagens");
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    const prompt = buildPrompt(formData);

    try {
      const response = await fetch("http://localhost:3000/planning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // TODO: Adicionar token de autenticação se a rota for privada
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar os dados do planejamento.");
      }

      const result = await response.json();

      // Armazenar tudo para a próxima tela
      setGeneratedPlan({
        prompt_data: formData,
        ai_prompt: prompt,
        plan_result: result.plan,
      });

      setStep(5); // Ir direto para a tela final
    } catch (error) {
      console.error("Erro no handleSubmit:", error);
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
    if (data.destinoEspecifico && (data.destino === "Para o exterior" || data.destino === "Para alguma cidade Brasileira")) {
      promptParts.push(`- Destino Específico: ${data.destinoEspecifico}.`);
    }
    if (data.pet === "Sim") promptParts.push(`- O viajante levará um pet.`);
    promptParts.push(`- Duração da Viagem: ${data.dias} dias.`);
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
    const content = (() => {
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
    })();

    return step >= 1 && step <= 4 ? (
      <StepContainer>{content}</StepContainer>
    ) : (
      content
    );
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
          <CloseButton onClick={handleClose}>&times;</CloseButton>
          <InitialScreenContainer>
            <h1>Partiu Viajar!</h1>
            <p>
              Crie seu roteiro de viagem personalizado com inteligência
              artificial em poucos minutos
            </p>

            <div className="features">
              <div className="feature">
                <span className="icon">
                  <Target size={20} />
                </span>
                <div className="title">100% Personalizado</div>
                <div className="description">
                  Roteiro único criado especialmente para o seu perfil e
                  preferências de viagem
                </div>
              </div>
              <div className="feature">
                <span className="icon">
                  <Zap size={20} />
                </span>
                <div className="title">Super Rápido</div>
                <div className="description">
                  Planejamento completo em menos de 5 minutos com tecnologia
                  avançada de IA
                </div>
              </div>
              <div className="feature">
                <span className="icon">
                  <Sparkles size={20} />
                </span>
                <div className="title">Experiência Premium</div>
                <div className="description">
                  Sugestões exclusivas e insights únicos para uma viagem
                  inesquecível
                </div>
              </div>
              <div className="feature">
                <span className="icon">
                  <Lightbulb size={20} />
                </span>
                <div className="title">Inteligência Avançada</div>
                <div className="description">
                  IA especializada em turismo com conhecimento global atualizado
                </div>
              </div>
            </div>

            <ContinueButton
              onClick={(e) => {
                e.stopPropagation();
                setStep(1);
              }}
              style={{ zIndex: 999, position: "relative" }}
            >
              Começar Minha Jornada
            </ContinueButton>
          </InitialScreenContainer>
        </FormContainer>
      </PageContainer>
    );
  }

  if (isLoading) {
    return (
      <PageContainer>
        <FloatingElements />
        <DecorativeElements>
          <div className="particle-1" />
          <div className="particle-2" />
          <div className="particle-3" />
        </DecorativeElements>
        <FormContainer>
          <LoadingContainer>
            <div className="loading-icon">
              <Plane size={48} />
            </div>
            <div className="loading-spinner"></div>
            <div className="loading-title">
              <Sparkles size={20} style={{ marginRight: "8px" }} /> Criando seu
              Roteiro dos Sonhos{" "}
              <Sparkles size={20} style={{ marginLeft: "8px" }} />
            </div>
            <div className="loading-subtitle">
              {loadingSteps[loadingStep] ||
                "<Sparkles size={16} /> Preparando tudo para você..."}
            </div>

            <div className="loading-steps">
              {loadingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`step ${index < loadingStep ? "completed" : ""} ${
                    index === loadingStep ? "active" : ""
                  }`}
                >
                  <span className="step-icon">
                    {index < loadingStep ? (
                      <CheckCircle size={16} />
                    ) : index === loadingStep ? (
                      <Loader size={16} className="spinning" />
                    ) : (
                      <Clock size={16} />
                    )}
                  </span>
                  <span className="step-text">
                    {step.replace(/^[🔍🎨💎✨]\s/, "")}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "2rem",
                fontSize: "0.9rem",
                color: "rgba(255, 255, 255, 0.7)",
                fontStyle: "italic",
              }}
            >
              <Wand2 size={16} style={{ marginRight: "8px" }} /> Nossa IA está
              trabalhando sua magia...
            </div>
          </LoadingContainer>
        </FormContainer>
      </PageContainer>
    );
  }

  if (step === 5) {
    return (
      <PageContainer>
        <FormContainer>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
          <FinalStep
            tripData={generatedPlan}
            onSaveSuccess={handleSaveSuccess}
            onClose={handleClose}
          />
        </FormContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <FloatingElements />
      <DecorativeElements>
        <div className="particle-1" />
        <div className="particle-2" />
        <div className="particle-3" />
      </DecorativeElements>
      <FormContainer>
        <CloseButton onClick={handleClose}>&times;</CloseButton>

        {step > 0 && step < 5 && (
          <StepIndicator>
            {[1, 2, 3, 4].map((stepNumber, index) => (
              <React.Fragment key={stepNumber}>
                <StepDot
                  $active={step === stepNumber}
                  $completed={step > stepNumber}
                />
                {index < 3 && <StepLine $completed={step > stepNumber} />}
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
