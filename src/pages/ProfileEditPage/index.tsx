import React, { useState } from "react";
import {
  Container,
  Header,
  HeaderContent,
  Logo,
  MainContent,
  Sidebar,
  SidebarNav,
  SidebarItem,
  ContentArea,
  ProfileHeader,
  ProfileForm,
  FormSection,
  FormRow,
  FormGroup,
  Label,
  Input,
  SaveButton,
  PhotoSection,
  PhotoPreview,
  PhotoActions,
  PhotoButton,
  Footer,
} from "./styles";
import { User, Settings, Bell, LogOut, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileEditPageProps {
  user?: {
    name: string;
    email: string;
    username?: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

const ProfileEditPage: React.FC<ProfileEditPageProps> = ({
  user,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
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
    // Aqui será implementada a lógica de upload de foto
    console.log("Upload de foto");
    // TODO: Implementar upload de foto no backend
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
      <Header>
        <HeaderContent>
          <Logo onClick={() => navigate("/")}>
            <ArrowLeft size={20} />
            Flya
          </Logo>
        </HeaderContent>
      </Header>

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
              <Settings size={20} />
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
                <p>Gerencie suas informações pessoais</p>
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
                      <PhotoButton onClick={handlePhotoUpload}>
                        Carregar Foto
                      </PhotoButton>
                      {formData.avatar && (
                        <PhotoButton
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
                      <Label>Nome Completo</Label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Digite seu nome completo"
                      />
                    </FormGroup>
                  </FormRow>

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
                      <Label>Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Digite seu email"
                      />
                    </FormGroup>
                  </FormRow>

                  <SaveButton onClick={handleSave}>
                    Salvar Alterações
                  </SaveButton>
                </FormSection>
              </ProfileForm>
            </>
          )}

          {activeTab === "security" && (
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h2>Configurações de Segurança</h2>
              <p>Funcionalidade em desenvolvimento</p>
              {/* TODO: Implementar mudança de senha, autenticação 2FA, etc. */}
            </div>
          )}

          {activeTab === "notifications" && (
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h2>Configurações de Notificações</h2>
              <p>Funcionalidade em desenvolvimento</p>
              {/* TODO: Implementar configurações de notificações por email, push, etc. */}
            </div>
          )}
        </ContentArea>
      </MainContent>

      <Footer>
        <div>
          <p>&copy; 2024 Flya. Todos os direitos reservados.</p>
          <div>
            <a href="/termos-de-uso">Termos de Uso</a>
            <a href="/politica-de-privacidade">Política de Privacidade</a>
          </div>
        </div>
      </Footer>
    </Container>
  );
};

export default ProfileEditPage;
