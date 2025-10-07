import React, { useState, useRef } from "react";
import { User, Bell, LogOut, Shield } from "lucide-react";
import { User as UserType } from "../../services/authService";
import {
  profileService,
  ProfileUpdateData,
} from "../../services/profileService";
import { useApiState } from "../../hooks/useApiState";
import { FeedbackMessage } from "../../components";
import {
  Container,
  MainContent,
  Sidebar,
  SidebarNav,
  SidebarItem,
  ContentArea,
  ProfileHeader,
  ProfileForm,
  FormSection,
  PhotoSection,
  PhotoPreview,
  PhotoActions,
  PhotoButton,
  FormRow,
  FormGroup,
  Label,
  Input,
  SaveButton,
} from "./styles";
import SecurityPage from "./SecurityPage";
import NotificationsPage from "./NotificationsPage";

interface ProfilePageProps {
  user: UserType;
  onLogout: () => void;
  onUserUpdate?: (user: UserType) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onLogout,
  onUserUpdate,
}) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    username: user?.username || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    birthDate: user?.birthDate || "",
    avatar: user?.avatar || "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    loading,
    error,
    success,
    setLoading,
    setError,
    setSuccess,
    clearMessages,
  } = useApiState();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearMessages();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.username.trim() ||
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim()
    ) {
      setError("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);

    const profileUpdateData: ProfileUpdateData = {
      username: formData.username.trim(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      birthDate: formData.birthDate,
      avatar: formData.avatar,
    };

    const response = await profileService.updateProfile(profileUpdateData);

    if (response.success && response.data) {
      setSuccess(response.message);
      // Update the user context if callback is provided
      if (onUserUpdate) {
        onUserUpdate(response.data);
      }
    } else {
      setError(response.message);
    }
  };

  const handlePhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Por favor, selecione apenas arquivos de imagem");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("A imagem deve ter no máximo 5MB");
      return;
    }

    setLoading(true);

    const response = await profileService.uploadAvatar(file);

    if (response.success && response.data) {
      setSuccess(response.message);
      setFormData((prev) => ({
        ...prev,
        avatar: response.data!.avatarUrl,
      }));
    } else {
      setError(response.message);
    }
  };

  const handlePhotoRemove = async () => {
    if (!formData.avatar) return;

    setLoading(true);

    const response = await profileService.removeAvatar();

    if (response.success) {
      setSuccess(response.message);
      setFormData((prev) => ({
        ...prev,
        avatar: "",
      }));
    } else {
      setError(response.message);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <>
            <ProfileHeader>
              <h1>Editar Perfil</h1>
            </ProfileHeader>

            <ProfileForm onSubmit={handleSubmit}>
              <FormSection>
                {/* Feedback Messages */}
                {loading && (
                  <FeedbackMessage
                    type="loading"
                    message="Salvando alterações..."
                  />
                )}
                {error && (
                  <FeedbackMessage
                    type="error"
                    message={error}
                    onClose={clearMessages}
                  />
                )}
                {success && (
                  <FeedbackMessage
                    type="success"
                    message={success}
                    onClose={clearMessages}
                  />
                )}

                <PhotoSection>
                  <PhotoPreview>
                    {formData.avatar ? (
                      <img src={formData.avatar} alt="Avatar" />
                    ) : (
                      <User size={60} />
                    )}
                  </PhotoPreview>
                  <PhotoActions>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <PhotoButton
                      type="button"
                      onClick={handlePhotoUpload}
                      disabled={loading}
                    >
                      Carregar Nova Foto
                    </PhotoButton>
                    {formData.avatar && (
                      <PhotoButton
                        type="button"
                        variant="outline"
                        onClick={handlePhotoRemove}
                        disabled={loading}
                      >
                        Remover Foto
                      </PhotoButton>
                    )}
                  </PhotoActions>
                </PhotoSection>

                <FormRow>
                  <FormGroup>
                    <Label>Nome de Usuário *</Label>
                    <Input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Digite seu nome de usuário"
                      required
                      disabled={loading}
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>Nome *</Label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Digite seu nome"
                      required
                      disabled={loading}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Sobrenome *</Label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Digite seu sobrenome"
                      required
                      disabled={loading}
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Digite seu email"
                      required
                      disabled={loading}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Data de Nascimento</Label>
                    <Input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </FormGroup>
                </FormRow>

                <SaveButton type="submit" disabled={loading}>
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </SaveButton>
              </FormSection>
            </ProfileForm>
          </>
        );

      case "security":
        return <SecurityPage />;

      case "notifications":
        return <NotificationsPage />;

      default:
        return null;
    }
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

        <ContentArea>{renderContent()}</ContentArea>
      </MainContent>
    </Container>
  );
};

export default ProfilePage;
