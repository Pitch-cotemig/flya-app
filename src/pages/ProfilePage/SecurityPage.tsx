import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Key,
  Shield,
  Smartphone,
  AlertTriangle,
} from "lucide-react";
import { colors } from "../../design-tokens/colors";
import {
  profileService,
  PasswordChangeData,
} from "../../services/profileService";
import { useApiState } from "../../hooks/useApiState";
import { FeedbackMessage } from "../../components";
import { ProfileHeader, Label, Input, SaveButton } from "./styles";
import {
  SecurityContainer,
  SecurityCard,
  SecurityCardHeader,
  SecurityCardIcon,
  SecurityCardTitle,
  SecurityCardDescription,
  SecurityCardContent,
  PasswordSection,
  PasswordFieldGroup,
  PasswordInputGroup,
  PasswordToggle,
  TwoFactorSection,
  TwoFactorStatus,
  StatusIndicator,
  ActionButton,
  DangerZone,
  DangerTitle,
  DangerDescription,
  DangerButton,
} from "./SecurityPage.styles";

const SecurityPage: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const passwordState = useApiState();
  const twoFactorState = useApiState();
  const sessionsState = useApiState();
  const deleteAccountState = useApiState();

  // Load security settings on component mount
  useEffect(() => {
    loadSecuritySettings();
  }, []);

  const loadSecuritySettings = async () => {
    const response = await profileService.getSecuritySettings();
    if (response.success && response.data) {
      setTwoFactorEnabled(response.data.twoFactorEnabled);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    passwordState.clearMessages();
  };

  const validatePasswordForm = (): string | null => {
    if (!passwordData.currentPassword.trim()) {
      return "Por favor, digite sua senha atual";
    }
    if (!passwordData.newPassword.trim()) {
      return "Por favor, digite uma nova senha";
    }
    if (passwordData.newPassword.length < 8) {
      return "A nova senha deve ter pelo menos 8 caracteres";
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return "As senhas não coincidem";
    }
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

    const passwordUpdateData: PasswordChangeData = {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
      confirmPassword: passwordData.confirmPassword,
    };

    const response = await profileService.changePassword(passwordUpdateData);

    if (response.success) {
      passwordState.setSuccess(response.message);
      // Clear form after successful password change
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      passwordState.setError(response.message);
    }
  };

  const handleToggle2FA = async () => {
    twoFactorState.setLoading(true);

    const newEnabled = !twoFactorEnabled;
    const response = await profileService.toggleTwoFactor(newEnabled);

    if (response.success) {
      setTwoFactorEnabled(newEnabled);
      twoFactorState.setSuccess(response.message);
    } else {
      twoFactorState.setError(response.message);
    }
  };

  const handleTerminateSessions = async () => {
    if (
      !window.confirm(
        "Tem certeza que deseja encerrar todas as outras sessões? Você permanecerá conectado apenas neste dispositivo."
      )
    ) {
      return;
    }

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
        "Tem certeza que deseja excluir sua conta permanentemente? Esta ação não pode ser desfeita."
      )
    ) {
      return;
    }

    if (
      !window.confirm(
        "ATENÇÃO: Todos os seus dados, viagens e configurações serão perdidos permanentemente. Digite 'CONFIRMAR' para continuar."
      )
    ) {
      return;
    }

    deleteAccountState.setLoading(true);

    const response = await profileService.deleteAccount();

    if (response.success) {
      deleteAccountState.setSuccess(response.message);
      // Redirect to login or home page after successful deletion
      setTimeout(() => {
        localStorage.removeItem("token");
        window.location.href = "/auth";
      }, 2000);
    } else {
      deleteAccountState.setError(response.message);
    }
  };

  return (
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
            {/* Password Change Feedback */}
            {passwordState.loading && (
              <FeedbackMessage type="loading" message="Alterando senha..." />
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
                {/* Senha Atual */}
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
                      disabled={passwordState.loading}
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      disabled={passwordState.loading}
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </PasswordToggle>
                  </PasswordInputGroup>
                </PasswordFieldGroup>

                {/* Nova Senha */}
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
                      disabled={passwordState.loading}
                      minLength={8}
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      disabled={passwordState.loading}
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </PasswordToggle>
                  </PasswordInputGroup>
                </PasswordFieldGroup>

                {/* Confirmar Nova Senha */}
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
                      disabled={passwordState.loading}
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={passwordState.loading}
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

              <SaveButton type="submit" disabled={passwordState.loading}>
                {passwordState.loading ? "Alterando..." : "Alterar Senha"}
              </SaveButton>
            </form>
          </SecurityCardContent>
        </SecurityCard>

        {/* Autenticação de Dois Fatores */}
        <SecurityCard>
          <SecurityCardHeader>
            <SecurityCardIcon>
              <Smartphone size={24} />
            </SecurityCardIcon>
            <div>
              <SecurityCardTitle>
                Autenticação de Dois Fatores
              </SecurityCardTitle>
              <SecurityCardDescription>
                Adicione uma camada extra de segurança à sua conta
              </SecurityCardDescription>
            </div>
          </SecurityCardHeader>

          <SecurityCardContent>
            {/* Two Factor Feedback */}
            {twoFactorState.loading && (
              <FeedbackMessage
                type="loading"
                message="Configurando autenticação..."
              />
            )}
            {twoFactorState.error && (
              <FeedbackMessage
                type="error"
                message={twoFactorState.error}
                onClose={twoFactorState.clearMessages}
              />
            )}
            {twoFactorState.success && (
              <FeedbackMessage
                type="success"
                message={twoFactorState.success}
                onClose={twoFactorState.clearMessages}
              />
            )}

            <TwoFactorSection>
              <TwoFactorStatus>
                <StatusIndicator active={twoFactorEnabled} />
                <span>{twoFactorEnabled ? "Ativado" : "Desativado"}</span>
              </TwoFactorStatus>

              <ActionButton
                variant={twoFactorEnabled ? "outline" : "primary"}
                onClick={handleToggle2FA}
                disabled={twoFactorState.loading}
              >
                {twoFactorState.loading
                  ? "Configurando..."
                  : twoFactorEnabled
                  ? "Desativar 2FA"
                  : "Ativar 2FA"}
              </ActionButton>
            </TwoFactorSection>

            {twoFactorEnabled && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  backgroundColor: colors.alpha.cyan01,
                  borderRadius: "12px",
                }}
              >
                <p
                  style={{
                    color: colors.text.primary,
                    margin: 0,
                    fontSize: "0.875rem",
                  }}
                >
                  ✓ Sua conta está protegida com autenticação de dois fatores
                </p>
              </div>
            )}
          </SecurityCardContent>
        </SecurityCard>

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
            {/* Sessions Feedback */}
            {sessionsState.loading && (
              <FeedbackMessage type="loading" message="Encerrando sessões..." />
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
                <span style={{ color: colors.text.primary, fontWeight: "600" }}>
                  Sessão Atual
                </span>
                <span
                  style={{ color: colors.primary.cyan, fontSize: "0.875rem" }}
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
            {/* Delete Account Feedback */}
            {deleteAccountState.loading && (
              <FeedbackMessage type="loading" message="Excluindo conta..." />
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
  );
};

export default SecurityPage;
