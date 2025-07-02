import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: 1px solid transparent;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Size variants */
  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return css`
          height: 2rem;
          padding: 0 0.75rem;
          font-size: 0.875rem;
        `;
      case 'lg':
        return css`
          height: 3rem;
          padding: 0 2rem;
          font-size: 1rem;
        `;
      default:
        return css`
          height: 2.5rem;
          padding: 0 1rem;
          font-size: 0.875rem;
        `;
    }
  }}

  /* Variant styles */
  ${({ variant = 'default', theme }) => {
    switch (variant) {
      case 'outline':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary[600]};
          border-color: ${theme.colors.primary[600]};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary[50]};
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary[600]};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary[50]};
          }
        `;
      default:
        return css`
          background-color: ${theme.colors.primary[600]};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary[700]};
          }
        `;
    }
  }}
`;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
}; 