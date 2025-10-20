import React, { useState } from "react";
import styled from "styled-components";
import { User, Bell, LogOut, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User as UserType } from "../../services/authService";
import { SecuritySection } from "../../components";

import { colors } from "../../design-tokens/colors";

const Container = styled.div`
min-height: 100vh;
display: flex;
flex-direction: column;
background-color: ${colors.profile.background};
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
background: ${({ active }) => (active ? "#3b82f6" : "#1e293b")};
transform: translateX(4px);
}

&.logout {
margin-top: 1rem;
color: ${colors.state.error};

&:hover {
background: ${colors.alpha.error02};
color: ${colors.state.error};
}
}

svg {
flex-shrink: 0;
}
`;

const ContentArea = styled.div`
flex: 1;
background: ${colors.profile.surface};
border-radius: 16px;
box-shadow: ${colors.shadow.card};
border: 1px solid ${colors.profile.border};
overflow: hidden;
`;

const ProfileHeader = styled.div`
padding: 2rem;
border-bottom: 1px solid ${colors.profile.border};
background: ${colors.profile.surface};
color: white;

h1 {
font-size: 2rem;
font-weight: 700;
margin-bottom: 0.5rem;
color: white;
}

p {
font-size: 1.1rem;
opacity: 0.9;
margin: 0;
color: #cbd5e1;
}
`;

const ProfileForm = styled.form`
padding: 2rem;
`;

const FormSection = styled.div`
display: flex;
flex-direction: column;
gap: 2rem;
`;

const PhotoSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 1.5rem;
padding: 2rem;
background: #1e293b;
border-radius: 12px;
border: 1px solid #334155;
text-align: center;
`;

const PhotoPreview = styled.div`
width: 150px;
height: 150px;
border-radius: 50%;
background: #334155;
border: 3px solid #475569;
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;
position: relative;
margin: 0 auto;

img {
width: 100%;
height: 100%;
object-fit: cover;
}

svg {
color: #94a3b8;
width: 60px;
height: 60px;
}
`;

const PhotoActions = styled.div`
display: flex;
flex-direction: column;
gap: 0.75rem;
width: 100%;
max-width: 300px;
`;

const PhotoButton = styled.button<{ variant?: "outline" }>`
padding: 0.75rem 1.5rem;
border: ${({ variant }) =>
    variant === "outline" ? "1px solid #475569" : "1px solid #3b82f6"};
border-radius: 8px;
background: ${({ variant }) =>
    variant === "outline" ? "transparent" : "#3b82f6"};
color: ${({ variant }) => (variant === "outline" ? "#e2e8f0" : "white")};
font-weight: 500;
cursor: pointer;
transition: all 0.2s ease;

&:hover {
background: ${({ variant }) =>
    variant === "outline" ? "#1e293b" : "#2563eb"};
transform: translateY(-2px);
}
`;

const FormRow = styled.div`
display: flex;
gap: 1rem;
width: 100%;

@media (max-width: 768px) {
flex-direction: column;
}
`;

const FormGroup = styled.div`
flex: 1;
display: flex;
flex-direction: column;
gap: 0.5rem;
`;

const Label = styled.label`
font-weight: 600;
color: #e2e8f0;
font-size: 0.9rem;
`;

const Input = styled.input`
padding: 1rem;
border: 1px solid #475569;
border-radius: 8px;
font-size: 1rem;
transition: all 0.2s ease;
background: #1e293b;
color: white;

&:focus {
outline: none;
border-color: ${colors.profile.blue};
box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

&::placeholder {
color: ${colors.profile.textDimmed};
}
`;

const SaveButton = styled.button`
padding: 1rem 2rem;
background: #1e40af;
color: white;
border: none;
border-radius: 8px;
font-weight: 600;
font-size: 1rem;
cursor: pointer;
transition: all 0.2s ease;
align-self: flex-start;

&:hover {
background: ${colors.profile.blueDark};
transform: translateY(-2px);
box-shadow: ${colors.shadow.purple};
}
`;



interface ProfilePageProps {
  user: UserType;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
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

  const handleSave = () => {
    // Aqui será implementada a lógica de salvar os dados
    console.log("Salvando dados:", formData);
    // TODO: Implementar API call para salvar perfil no backend
  };

  const handlePhotoUpload = () => {
    // Criar input file invisível
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Criar URL temporária para preview
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setFormData((prev) => ({
            ...prev,
            avatar: result,
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
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

              <ProfileForm>
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
                      <Label>Primeiro Nome</Label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Digite seu primeiro nome"
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
                        placeholder="Digite sua data de nascimento"
                      />
                    </FormGroup>
                  </FormRow>

                  <SaveButton type="button" onClick={handleSave}>
                    Salvar alterações
                  </SaveButton>
                </FormSection>
              </ProfileForm>
            </>
          )}

          {activeTab === "security" && (
            <SecuritySection />
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