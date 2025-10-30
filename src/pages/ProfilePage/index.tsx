import React, { useState } from "react";
import styled from "styled-components";
import {
  User,
  Bell,
  LogOut,
  Shield,
  Eye,
  EyeOff,
  Key,
  AlertTriangle,
} from "lucide-react";
import { User as UserType } from "../../services/authService";
import { profileService } from "../../services/profileService";
import { useApiState } from "../../hooks/useApiState";
import { FeedbackMessage, SecuritySection } from "../../components";
import NotificationsPage from "./NotificationsPage";

import { colors } from "../../design-tokens/colors";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${colors.background.primary};
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

  &:hover:not(:disabled) {
    background: ${({ variant }) =>
      variant === "outline" ? "#1e293b" : "#2563eb"};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #0f172a;
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

  &:hover:not(:disabled) {
    background: ${colors.profile.blueDark};
    transform: translateY(-2px);
    box-shadow: ${colors.shadow.purple};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Security Styles
const SecurityContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SecurityCard = styled.div`
  background: ${colors.background.glassSoft};
  border-radius: 16px;
  border: 1px solid ${colors.border.white};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.border.whiteStrong};
    box-shadow: ${colors.shadow.lg};
  }
`;

const SecurityCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid ${colors.border.white};
`;

const SecurityCardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${colors.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.text.primary};
  box-shadow: ${colors.shadow.cyan};
`;

const SecurityCardTitle = styled.h3`
  color: ${colors.text.primary};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;

const SecurityCardDescription = styled.p`
  color: ${colors.text.primaryAlpha80};
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
`;

const SecurityCardContent = styled.div`
  padding: 1.5rem;
`;

const PasswordSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background: ${colors.background.glass};
  border-radius: 16px;
  border: 1px solid ${colors.border.white};
  margin-bottom: 1.5rem;
`;

const PasswordFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const PasswordInputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: ${colors.text.primaryAlpha60};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  z-index: 1;

  &:hover {
    color: ${colors.text.primary};
    background: ${colors.background.glassStrong};
  }
`;

const ActionButton = styled.button<{ variant?: "primary" | "outline" }>`
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: ${({ variant }) =>
    variant === "outline" ? `1px solid ${colors.border.white}` : "none"};
  background: ${({ variant }) =>
    variant === "outline" ? "transparent" : colors.gradients.primary};
  color: ${colors.text.primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ variant }) =>
      variant === "outline"
        ? colors.background.glassStrong
        : colors.gradients.cyanHover};
    transform: translateY(-2px);
    box-shadow: ${({ variant }) =>
      variant === "outline" ? colors.shadow.lg : colors.shadow.cyan};
  }
`;

const DangerZone = styled(SecurityCard)`
  border-color: ${colors.alpha.error02};
  background: linear-gradient(
    135deg,
    ${colors.alpha.error02},
    ${colors.background.glassSoft}
  );

  &:hover {
    border-color: ${colors.state.error};
  }
`;

const DangerTitle = styled(SecurityCardTitle)`
  color: ${colors.state.error};
`;

const DangerDescription = styled(SecurityCardDescription)`
  color: ${colors.text.primaryAlpha80};
`;

const DangerButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: 1px solid ${colors.state.error};
  background: transparent;
  color: ${colors.state.error};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.state.error};
    color: ${colors.text.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${colors.alpha.error04};
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

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(user?.avatar || "");

  // Security states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const profileState = useApiState();
  const passwordState = useApiState();
  const sessionsState = useApiState();
  const deleteAccountState = useApiState();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    profileState.clearMessages();
  };

  const validateProfileForm = (): string | null => {
    if (!formData.username.trim()) {
      return "Nome de usuário é obrigatório";
    }
    if (!formData.firstName.trim()) {
      return "Primeiro nome é obrigatório";
    }
    if (!formData.lastName.trim()) {
      return "Sobrenome é obrigatório";
    }
    if (!formData.email.trim()) {
      return "Email é obrigatório";
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Email inválido";
    }
    return null;
  };

  const handleSave = async () => {
    // Validate form
    const validationError = validateProfileForm();
    if (validationError) {
      profileState.setError(validationError);
      return;
    }

    profileState.setLoading(true);
    profileState.clearMessages();

    try {
      // Update profile data (with avatar if present)
      const response = await profileService.updateProfile(formData, avatarFile || undefined);

      if (response.success) {
        profileState.setSuccess(response.message);

        // Update local user data
        if (response.data) {
          // Update the user object in parent component or context
          console.log("Profile updated:", response.data);

          // Update avatar preview with the new URL from backend
          if (response.data.avatar) {
            setAvatarPreview(response.data.avatar);
            setFormData(prev => ({
              ...prev,
              avatar: response.data.avatar || ""
            }));
          }
        }

        // Clear avatar file after successful upload
        setAvatarFile(null);
      } else {
        profileState.setError(response.message);
      }
    } catch (error) {
      profileState.setError("Erro ao salvar perfil. Tente novamente.");
    }
  };

  const handlePhotoUpload = () => {
    // Create invisible file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/jpg,image/png,image/gif";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          profileState.setError("A imagem deve ter no máximo 5MB");
          return;
        }

        // Validate file type
        if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
          profileState.setError("Apenas imagens JPG, PNG ou GIF são permitidas");
          return;
        }

        // Store the file for upload
        setAvatarFile(file);

        // Create temporary URL for preview
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setAvatarPreview(result);
          setFormData((prev) => ({
            ...prev,
            avatar: result,
          }));
        };
        reader.readAsDataURL(file);
        profileState.clearMessages();
      }
    };
    input.click();
  };

  const handlePhotoRemove = async () => {
    if (!window.confirm("Tem certeza que deseja remover sua foto de perfil?")) {
      return;
    }

    profileState.setLoading(true);
    const response = await profileService.removeAvatar();

    if (response.success) {
      setAvatarPreview("");
      setAvatarFile(null);
      setFormData((prev) => ({
        ...prev,
        avatar: "",
      }));
      profileState.setSuccess("Foto removida com sucesso");
    } else {
      profileState.setError(response.message);
    }
  };

  // Security handlers
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    passwordState.clearMessages();
  };

  const validatePasswordForm = (): string | null => {
    if (!passwordData.currentPassword.trim())
      return "Por favor, digite sua senha atual";
    if (!passwordData.newPassword.trim())
      return "Por favor, digite uma nova senha";
    if (passwordData.newPassword.length < 8)
      return "A nova senha deve ter pelo menos 8 caracteres";
    if (passwordData.newPassword !== passwordData.confirmPassword)
      return "As senhas não coincidem";
    return null;
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validatePasswordForm();
    if (validationError) {
      passwordState.setError(validationError);
      return;
    }
    passwordState.setLoading(true);
    const response = await profileService.changePassword(passwordData);
    if (response.success) {
      passwordState.setSuccess(response.message);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      passwordState.setError(response.message);
    }
  };

  const handleTerminateSessions = async () => {
    if (
      !window.confirm(
        "Tem certeza que deseja encerrar todas as outras sessões?"
      )
    )
      return;
    sessionsState.setLoading(true);
    const response = await profileService.terminateAllSessions();
    if (response.success) {
      sessionsState.setSuccess(response.message);
    } else {
      sessionsState.setError(response.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Tem certeza que deseja excluir sua conta permanentemente?"
      )
    )
      return;
    if (!window.confirm("Esta ação é IRREVERSÍVEL. Confirma a exclusão?"))
      return;

    deleteAccountState.setLoading(true);
    const response = await profileService.deleteAccount();

    if (response.success) {
      deleteAccountState.setSuccess(response.message);
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/auth";
      }, 2000);
    } else {
      deleteAccountState.setError(response.message);
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

        <ContentArea>
          {activeTab === "profile" && (
            <>
              <ProfileHeader>
                <h1>Editar Perfil</h1>
                <p>Gerencie suas informações pessoais</p>
              </ProfileHeader>

              <ProfileForm>
                <FormSection>
                  {/* Feedback Messages */}
                  {profileState.loading && (
                    <FeedbackMessage
                      type="loading"
                      message="Salvando perfil..."
                    />
                  )}
                  {profileState.error && (
                    <FeedbackMessage
                      type="error"
                      message={profileState.error}
                      onClose={profileState.clearMessages}
                    />
                  )}
                  {profileState.success && (
                    <FeedbackMessage
                      type="success"
                      message={profileState.success}
                      onClose={profileState.clearMessages}
                    />
                  )}

                  <PhotoSection>
                    <PhotoPreview>
                      {avatarPreview || formData.avatar ? (
                        <img src={avatarPreview || formData.avatar} alt="Avatar" />
                      ) : (
                        <User size={60} />
                      )}
                    </PhotoPreview>
                    <PhotoActions>
                      <PhotoButton
                        type="button"
                        onClick={handlePhotoUpload}
                        disabled={profileState.loading}
                      >
                        {avatarFile ? "Alterar Foto" : "Carregar Nova Foto"}
                      </PhotoButton>
                      {(avatarPreview || formData.avatar) && (
                        <PhotoButton
                          type="button"
                          variant="outline"
                          onClick={handlePhotoRemove}
                          disabled={profileState.loading}
                        >
                          Remover Foto
                        </PhotoButton>
                      )}
                    </PhotoActions>
                    {avatarFile && (
                      <p style={{ color: "#94a3b8", fontSize: "0.875rem", margin: "0.5rem 0 0" }}>
                        Nova foto selecionada: {avatarFile.name}
                      </p>
                    )}
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
                        disabled={profileState.loading}
                        required
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
                        disabled={profileState.loading}
                        required
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
                        disabled={profileState.loading}
                        required
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
                        disabled={profileState.loading}
                        required
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
                        disabled={profileState.loading}
                      />
                    </FormGroup>
                  </FormRow>

                  <SaveButton
                    type="button"
                    onClick={handleSave}
                    disabled={profileState.loading}
                  >
                    {profileState.loading ? "Salvando..." : "Salvar alterações"}
                  </SaveButton>
                </FormSection>
              </ProfileForm>
            </>
          )}

          {activeTab === "security" && (
            <>
              <ProfileHeader>
                <h1>Configurações de Segurança</h1>
              </ProfileHeader>

              <SecurityContainer>
                {/* Mudança de Senha */}
                <SecurityCard>
                  <SecurityCardHeader>
                    <SecurityCardIcon>
                      <Key size={24} />
                    </SecurityCardIcon>
                    <div>
                      <SecurityCardTitle>Alterar Senha</SecurityCardTitle>
                      <SecurityCardDescription>
                        Mantenha sua conta segura com uma senha forte
                      </SecurityCardDescription>
                    </div>
                  </SecurityCardHeader>

                  <SecurityCardContent>
                    {passwordState.loading && (
                      <FeedbackMessage
                        type="loading"
                        message="Alterando senha..."
                      />
                    )}
                    {passwordState.error && (
                      <FeedbackMessage
                        type="error"
                        message={passwordState.error}
                        onClose={passwordState.clearMessages}
                      />
                    )}
                    {passwordState.success && (
                      <FeedbackMessage
                        type="success"
                        message={passwordState.success}
                        onClose={passwordState.clearMessages}
                      />
                    )}

                    <form onSubmit={handlePasswordSubmit}>
                      <PasswordSection>
                        <PasswordFieldGroup>
                          <Label>Senha Atual</Label>
                          <PasswordInputGroup>
                            <Input
                              type={showCurrentPassword ? "text" : "password"}
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              placeholder="Digite sua senha atual"
                              required
                            />
                            <PasswordToggle
                              type="button"
                              onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                            >
                              {showCurrentPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </PasswordToggle>
                          </PasswordInputGroup>
                        </PasswordFieldGroup>

                        <PasswordFieldGroup>
                          <Label>Nova Senha</Label>
                          <PasswordInputGroup>
                            <Input
                              type={showNewPassword ? "text" : "password"}
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              placeholder="Digite sua nova senha (mín. 8 caracteres)"
                              required
                              minLength={8}
                            />
                            <PasswordToggle
                              type="button"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            >
                              {showNewPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </PasswordToggle>
                          </PasswordInputGroup>
                        </PasswordFieldGroup>

                        <PasswordFieldGroup>
                          <Label>Confirmar Nova Senha</Label>
                          <PasswordInputGroup>
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              placeholder="Confirme sua nova senha"
                              required
                            />
                            <PasswordToggle
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </PasswordToggle>
                          </PasswordInputGroup>
                        </PasswordFieldGroup>
                      </PasswordSection>

                      <SaveButton
                        type="submit"
                        disabled={passwordState.loading}
                      >
                        {passwordState.loading
                          ? "Alterando..."
                          : "Alterar Senha"}
                      </SaveButton>
                    </form>
                  </SecurityCardContent>
                </SecurityCard>

                {/* Autenticação de Dois Fatores */}
                <SecuritySection />

                {/* Sessões Ativas */}
                <SecurityCard>
                  <SecurityCardHeader>
                    <SecurityCardIcon>
                      <Shield size={24} />
                    </SecurityCardIcon>
                    <div>
                      <SecurityCardTitle>Sessões Ativas</SecurityCardTitle>
                      <SecurityCardDescription>
                        Gerencie onde você está conectado
                      </SecurityCardDescription>
                    </div>
                  </SecurityCardHeader>

                  <SecurityCardContent>
                    {sessionsState.loading && (
                      <FeedbackMessage
                        type="loading"
                        message="Encerrando sessões..."
                      />
                    )}
                    {sessionsState.error && (
                      <FeedbackMessage
                        type="error"
                        message={sessionsState.error}
                        onClose={sessionsState.clearMessages}
                      />
                    )}
                    {sessionsState.success && (
                      <FeedbackMessage
                        type="success"
                        message={sessionsState.success}
                        onClose={sessionsState.clearMessages}
                      />
                    )}

                    <div
                      style={{
                        padding: "1rem",
                        backgroundColor: colors.background.glassSoft,
                        borderRadius: "12px",
                        marginBottom: "1rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            color: colors.text.primary,
                            fontWeight: "600",
                          }}
                        >
                          Sessão Atual
                        </span>
                        <span
                          style={{
                            color: colors.primary.cyan,
                            fontSize: "0.875rem",
                          }}
                        >
                          Ativo agora
                        </span>
                      </div>
                      <p
                        style={{
                          color: colors.text.primaryAlpha80,
                          fontSize: "0.875rem",
                          margin: 0,
                        }}
                      >
                        Windows • Chrome • São Paulo, Brasil
                      </p>
                    </div>

                    <ActionButton
                      variant="outline"
                      onClick={handleTerminateSessions}
                      disabled={sessionsState.loading}
                    >
                      {sessionsState.loading
                        ? "Encerrando..."
                        : "Encerrar Todas as Outras Sessões"}
                    </ActionButton>
                  </SecurityCardContent>
                </SecurityCard>

                {/* Zona de Perigo */}
                <DangerZone>
                  <SecurityCardHeader>
                    <SecurityCardIcon style={{ color: colors.state.error }}>
                      <AlertTriangle size={24} />
                    </SecurityCardIcon>
                    <div>
                      <DangerTitle>Zona de Perigo</DangerTitle>
                      <DangerDescription>
                        Ações irreversíveis que afetam permanentemente sua conta
                      </DangerDescription>
                    </div>
                  </SecurityCardHeader>

                  <SecurityCardContent>
                    {deleteAccountState.loading && (
                      <FeedbackMessage
                        type="loading"
                        message="Excluindo conta..."
                      />
                    )}
                    {deleteAccountState.error && (
                      <FeedbackMessage
                        type="error"
                        message={deleteAccountState.error}
                        onClose={deleteAccountState.clearMessages}
                      />
                    )}
                    {deleteAccountState.success && (
                      <FeedbackMessage
                        type="success"
                        message={deleteAccountState.success}
                      />
                    )}

                    <DangerButton
                      onClick={handleDeleteAccount}
                      disabled={deleteAccountState.loading}
                    >
                      {deleteAccountState.loading
                        ? "Excluindo..."
                        : "Excluir Conta Permanentemente"}
                    </DangerButton>
                  </SecurityCardContent>
                </DangerZone>
              </SecurityContainer>
            </>
          )}

          {activeTab === "notifications" && <NotificationsPage />}
        </ContentArea>
      </MainContent>
    </Container>
  );
};

export default ProfilePage;
