import React from 'react';
import styled from 'styled-components';
import { User } from '../../services/authService';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  min-height: 80vh;
`;

const ProfileTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 24px;
`;

const UserInfo = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 32px;
`;

const LogoutButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d63234;
  }
`;

interface ProfilePageProps {
  user: User;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout }) => {
  return (
    <ProfileContainer>
      <ProfileTitle>Meu Perfil</ProfileTitle>
      <UserInfo>Olá, {user.email}!</UserInfo>
      <LogoutButton onClick={onLogout}>Sair (Logout)</LogoutButton>
    </ProfileContainer>
  );
};

export default ProfilePage; 