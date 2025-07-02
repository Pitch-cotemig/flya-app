import React from 'react';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const StyledInput = styled.input`
  display: flex;
  height: 2.5rem;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.fonts.main};
  transition: all 0.2s ease-in-out;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[500]};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[600]};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary[600]};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const Input: React.FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
}; 