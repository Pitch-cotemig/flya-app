import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

export const Header = styled.header`
  background: ${({ theme }) => theme.colors.custom.darkBlue};
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
`;

export const Sidebar = styled.aside`
  width: 280px;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  height: fit-content;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SidebarItem = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  background: ${({ active, theme }) => 
    active ? theme.colors.primary[500] : 'transparent'
  };
  color: ${({ active, theme }) => 
    active ? 'white' : theme.colors.gray[700]
  };
  font-weight: ${({ active }) => active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;

  &:hover {
    background: ${({ active, theme }) => 
      active ? theme.colors.primary[500] : theme.colors.gray[50]
    };
    transform: translateX(4px);
  }

  &.logout {
    margin-top: 1rem;
    color: #ef4444;
    
    &:hover {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }
  }

  svg {
    flex-shrink: 0;
  }
`;

export const ContentArea = styled.div`
  flex: 1;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  overflow: hidden;
`;

export const ProfileHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[500]} 0%, ${({ theme }) => theme.colors.purple[500]} 100%);
  color: white;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0;
  }
`;

export const ProfileForm = styled.form`
  padding: 2rem;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const PhotoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.gray[50]};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const PhotoPreview = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gray[100]};
  border: 2px solid ${({ theme }) => theme.colors.gray[300]};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const PhotoActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export const PhotoButton = styled.button<{ variant?: 'outline' }>`
  padding: 0.75rem 1.5rem;
  border: ${({ variant, theme }) => 
    variant === 'outline' 
      ? `1px solid ${theme.colors.gray[300]}` 
      : `1px solid ${theme.colors.primary[500]}`
  };
  border-radius: 8px;
  background: ${({ variant, theme }) => 
    variant === 'outline' ? 'transparent' : theme.colors.primary[500]
  };
  color: ${({ variant, theme }) => 
    variant === 'outline' ? theme.colors.gray[700] : 'white'
  };
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ variant, theme }) => 
      variant === 'outline' 
        ? theme.colors.gray[50] 
        : theme.colors.primary[600]
    };
    transform: translateY(-2px);
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[700]};
  font-size: 0.9rem;
`;

export const Input = styled.input`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const SaveButton = styled.button`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[600]};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
`;

export const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.gray[900]};
  color: white;
  padding: 2rem 1rem;
  margin-top: auto;

  > div {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }

    p {
      margin: 0;
      opacity: 0.8;
    }

    div {
      display: flex;
      gap: 2rem;

      a {
        color: white;
        text-decoration: none;
        opacity: 0.8;
        transition: opacity 0.2s ease;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
`;
