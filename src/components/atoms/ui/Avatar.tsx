import React from 'react';
import styled from 'styled-components';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AvatarContainer = styled.div<{ size: 'sm' | 'md' | 'lg' }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return `
          width: 2rem;
          height: 2rem;
        `;
      case 'lg':
        return `
          width: 4rem;
          height: 4rem;
        `;
      default:
        return `
          width: 3rem;
          height: 3rem;
        `;
    }
  }}
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarFallback = styled.div<{ size: 'sm' | 'md' | 'lg' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  color: ${({ theme }) => theme.colors.gray[600]};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 500;
  
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return `font-size: 0.75rem;`;
      case 'lg':
        return `font-size: 1.25rem;`;
      default:
        return `font-size: 1rem;`;
    }
  }}
`;

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = '', 
  fallback = '?', 
  size = 'md', 
  className,
  ...props 
}) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <AvatarContainer size={size} className={className} {...props}>
      {src && !imageError ? (
        <AvatarImage 
          src={src} 
          alt={alt} 
          onError={handleImageError}
        />
      ) : (
        <AvatarFallback size={size}>
          {fallback}
        </AvatarFallback>
      )}
    </AvatarContainer>
  );
}; 