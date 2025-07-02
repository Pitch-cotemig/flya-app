import React from 'react';
import styled from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const StyledCard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray[900]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const StyledCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const StyledCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.025em;
  font-family: ${({ theme }) => theme.fonts.main};
`;

const StyledCardDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-family: ${({ theme }) => theme.fonts.main};
`;

const StyledCardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  padding-top: 0;
`;

const StyledCardFooter = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  padding-top: 0;
`;

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => (
  <StyledCard className={className} {...props}>
    {children}
  </StyledCard>
);

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className, ...props }) => (
  <StyledCardHeader className={className} {...props}>
    {children}
  </StyledCardHeader>
);

export const CardTitle: React.FC<CardTitleProps> = ({ children, className, ...props }) => (
  <StyledCardTitle className={className} {...props}>
    {children}
  </StyledCardTitle>
);

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className, ...props }) => (
  <StyledCardDescription className={className} {...props}>
    {children}
  </StyledCardDescription>
);

export const CardContent: React.FC<CardContentProps> = ({ children, className, ...props }) => (
  <StyledCardContent className={className} {...props}>
    {children}
  </StyledCardContent>
);

export const CardFooter: React.FC<CardFooterProps> = ({ children, className, ...props }) => (
  <StyledCardFooter className={className} {...props}>
    {children}
  </StyledCardFooter>
); 