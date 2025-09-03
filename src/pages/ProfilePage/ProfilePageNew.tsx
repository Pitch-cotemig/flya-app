import React, { useState } from "react";
import styled from "styled-components";
import { User, Bell, LogOut, Shield } from "lucide-react";
import { User as UserType } from "../../services/authService";
import { colors } from "../../design-tokens/colors";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${colors.profile.background};
  padding-top: 5rem;
`;

const MainContent = styled.main`
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

const Sidebar = styled.aside`
  width: 280px;
  background: ${colors.profile.surface};
  border-radius: 16px;
  padding: 1.5rem;
  height: fit-content;
  box-shadow: ${colors.shadow.card};
  border: 1px solid ${colors.profile.border};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SidebarItem = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  background: ${({ active }) => (active ? "#3b82f6" : "transparent")};
  color: ${({ active }) => (active ? "white" : "#e2e8f0")};
  font-weight: ${({ active }) => (active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;

  &:hover {
    background: ${({ active }) => (active ? "#3b82f6" : "#374151")};
  }

  &.logout {
    margin-top: 1rem;
    color: #ef4444;

    &:hover {
      background: rgba(239, 68, 68, 0.1);
    }
  }
`;

const ContentArea = styled.div`
  flex: 1;
  background: ${colors.profile.surface};
  border-radius: 16px;
  padding: 0;
  box-shadow: ${colors.shadow.card};
  border: 1px solid ${colors.profile.border};
  overflow: hidden;
`;

const ProfileHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid ${colors.profile.border};

  h1 {
    color: white;
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
  }
`;

const ProfileForm = styled.form`
  padding: 2rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const PhotoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

const PhotoPreview = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${colors.profile.border};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 3px solid ${colors.profile.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    color: #9ca3af;
  }
`;

const PhotoActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const PhotoButton = styled.button<{ variant?: "outline" }>`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: ${({ variant }) =>
    variant === "outline" ? `1px solid ${colors.profile.border}` : "none"};
  background: ${({ variant }) =>
    variant === "outline" ? "transparent" : "#3b82f6"};
  color: ${({ variant }) => (variant === "outline" ? "#9ca3af" : "white")};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ variant }) =>
      variant === "outline" ? "#374151" : "#2563eb"};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: white;
  font-weight: 500;
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${colors.profile.border};
  border-radius: 8px;
  background: ${colors.profile.background};
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #6b7280;
  }
`;

const SaveButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    background: #6b7280;
    cursor: not-allowed;
  }
`;

interface ProfilePageProps {
  user: UserType;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    username: user?.username || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    birthDate: user?.birthDate || "",
    avatar: user?.avatar || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar envio dos dados para o backend
    console.log("Dados do perfil:", formData);
  };

  const handlePhotoUpload = () => {
    // TODO: Implementar upload de foto
    console.log("Upload de foto");
  };

  const handlePhotoRemove = () => {
    setFormData((prev) => ({
      ...prev,
      avatar: "",
    }));
    // TODO: Implementar remoção da foto no backend
  };

  return (
    <Container>
      <MainContent>
        <Sidebar>
          <SidebarNav>
            <SidebarItem
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            >
              <User size={20} />
              Editar Perfil
            </SidebarItem>
            <SidebarItem
              active={activeTab === "security"}
              onClick={() => setActiveTab("security")}
            >
              <Shield size={20} />
              Segurança
            </SidebarItem>
            <SidebarItem
              active={activeTab === "notifications"}
              onClick={() => setActiveTab("notifications")}
            >
              <Bell size={20} />
              Notificações
            </SidebarItem>
            <SidebarItem onClick={onLogout} className="logout">
              <LogOut size={20} />
              Sair
            </SidebarItem>
          </SidebarNav>
        </Sidebar>

        <ContentArea>
          {activeTab === "profile" && (
            <>
              <ProfileHeader>
                <h1>Editar Perfil</h1>
              </ProfileHeader>

              <ProfileForm onSubmit={handleSubmit}>
                <FormSection>
                  <PhotoSection>
                    <PhotoPreview>
                      {formData.avatar ? (
                        <img src={formData.avatar} alt="Avatar" />
                      ) : (
                        <User size={60} />
                      )}
                    </PhotoPreview>
                    <PhotoActions>
                      <PhotoButton type="button" onClick={handlePhotoUpload}>
                        Carregar Nova Foto
                      </PhotoButton>
                      {formData.avatar && (
                        <PhotoButton
                          type="button"
                          variant="outline"
                          onClick={handlePhotoRemove}
                        >
                          Remover Foto
                        </PhotoButton>
                      )}
                    </PhotoActions>
                  </PhotoSection>

                  <FormRow>
                    <FormGroup>
                      <Label>Nome de Usuário</Label>
                      <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Digite seu nome de usuário"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>Nome</Label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Digite seu nome"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Sobrenome</Label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Digite seu sobrenome"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Digite seu email"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Data de Nascimento</Label>
                      <Input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </FormRow>

                  <SaveButton type="submit">Salvar Alterações</SaveButton>
                </FormSection>
              </ProfileForm>
            </>
          )}

          {activeTab === "security" && (
            <div
              style={{ padding: "2rem", textAlign: "center", color: "white" }}
            >
              <h2>Configurações de Segurança</h2>
              <p>Funcionalidade em desenvolvimento</p>
              {/* TODO: Implementar mudança de senha, autenticação 2FA, etc. */}
            </div>
          )}

          {activeTab === "notifications" && (
            <div
              style={{ padding: "2rem", textAlign: "center", color: "white" }}
            >
              <h2>Configurações de Notificações</h2>
              <p>Funcionalidade em desenvolvimento</p>
              {/* TODO: Implementar configurações de notificações por email, push, etc. */}
            </div>
          )}
        </ContentArea>
      </MainContent>
    </Container>
  );
};

export default ProfilePage;
