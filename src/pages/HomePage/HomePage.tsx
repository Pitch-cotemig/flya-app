import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Button } from "@/components/atoms/ui/Button";
import { Input } from "@/components/atoms/ui/Input";
import { Hero } from "@/components/organisms/sections/Hero";
import { PopularDestinations } from "@/components/organisms/sections/PopularDestinations";
import { Testimonials } from "@/components/organisms/sections/Testimonials";

const PageContainer = styled.div``;

const ContentContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.custom.darkBlue};
`;

const FloatingFormContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  z-index: 20;
  width: 100%;
  max-width: 36rem;
  transform: translate(-50%, -25%);
  padding: 0 1rem;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const StyledInput = styled(Input)`
  height: 3.5rem;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: none;
  background-color: rgba(255, 255, 255, 0.95);
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[800]};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[500]};
  }
  
  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary[400]};
  }
`;

const PlanButton = styled(Button)`
  height: 3rem;
  width: 100%;
  flex-shrink: 0;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: auto;
  }
`;

export default function HomePage() {
  const navigate = useNavigate();

  const handlePlanClick = () => {
    navigate('/planejamento');
  };

  return (
    <PageContainer>
      <Hero />

      {/* Container para o resto da página que permite o posicionamento absoluto do formulário */}
      <ContentContainer>
        {/* Formulário flutuante */}
        <FloatingFormContainer>
          <FormContent>
            <StyledInput 
              type="text" 
              placeholder="Quanto você quer gastar?"
            />
            <PlanButton 
              size="lg" 
              onClick={handlePlanClick}
            >
              Planejar
            </PlanButton>
          </FormContent>
        </FloatingFormContainer>

        <PopularDestinations />
        <Testimonials />
      </ContentContainer>
    </PageContainer>
  )
} 