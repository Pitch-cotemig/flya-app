import React, { useState, useEffect } from "react";
import {
  Bell,
  Mail,
  Smartphone,
  Globe,
  Calendar,
  MapPin,
  CreditCard,
} from "lucide-react";
import { colors } from "../../design-tokens/colors";
import {
  profileService,
  NotificationSettings,
  NotificationSetting,
} from "../../services/profileService";
import { useApiState } from "../../hooks/useApiState";
import { FeedbackMessage } from "../../components";
import { ProfileHeader } from "./styles";
import {
  NotificationsContainer,
  NotificationSection,
  SectionTitle,
  SectionDescription,
  NotificationCard,
  NotificationHeader,
  NotificationIcon,
  NotificationInfo,
  NotificationTitle,
  NotificationDescription,
  NotificationToggle,
  ToggleSwitch,
  ToggleSlider,
  NotificationFrequency,
  FrequencyLabel,
  FrequencySelect,
  SaveButton,
} from "./NotificationsPage.styles";

// Extending the service interface to include React icon
interface NotificationSettingWithIcon extends NotificationSetting {
  icon: React.ReactNode;
}

const NotificationsPage: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState<
    NotificationSettingWithIcon[]
  >([]);

  const [pushNotifications, setPushNotifications] = useState<
    NotificationSettingWithIcon[]
  >([]);

  const {
    loading,
    error,
    success,
    setLoading,
    setError,
    setSuccess,
    clearMessages,
  } = useApiState();

  // Default notification settings
  const defaultEmailNotifications: NotificationSettingWithIcon[] = [
    {
      id: "trip-updates",
      title: "Atualizações de Viagem",
      description:
        "Receba notificações sobre mudanças em seus planos de viagem",
      icon: <Calendar size={20} />,
      enabled: true,
      frequency: "instant",
      hasFrequency: true,
      type: "email",
    },
    {
      id: "booking-confirmations",
      title: "Confirmações de Reserva",
      description: "Confirmações de hotéis, voos e outros serviços",
      icon: <CreditCard size={20} />,
      enabled: true,
      type: "email",
    },
    {
      id: "destination-tips",
      title: "Dicas de Destino",
      description: "Sugestões e informações sobre seus destinos",
      icon: <MapPin size={20} />,
      enabled: false,
      frequency: "weekly",
      hasFrequency: true,
      type: "email",
    },
    {
      id: "promotional",
      title: "Ofertas Promocionais",
      description: "Descontos e ofertas especiais para viagens",
      icon: <Mail size={20} />,
      enabled: false,
      frequency: "weekly",
      hasFrequency: true,
      type: "email",
    },
  ];

  const defaultPushNotifications: NotificationSettingWithIcon[] = [
    {
      id: "real-time-updates",
      title: "Atualizações em Tempo Real",
      description: "Notificações instantâneas sobre sua viagem atual",
      icon: <Bell size={20} />,
      enabled: true,
      type: "push",
    },
    {
      id: "check-in-reminders",
      title: "Lembretes de Check-in",
      description: "Lembrete 24h antes do check-in do hotel ou voo",
      icon: <Calendar size={20} />,
      enabled: true,
      type: "push",
    },
    {
      id: "weather-alerts",
      title: "Alertas de Clima",
      description: "Mudanças importantes no clima do seu destino",
      icon: <Globe size={20} />,
      enabled: false,
      type: "push",
    },
  ];

  // Load notification settings on component mount
  useEffect(() => {
    loadNotificationSettings();
  }, []);

  // Helper function to add icons to notification settings
  const addIconsToNotifications = (
    notifications: NotificationSetting[]
  ): NotificationSettingWithIcon[] => {
    const iconMap: Record<string, React.ReactNode> = {
      "trip-updates": <Calendar size={20} />,
      "booking-confirmations": <CreditCard size={20} />,
      "destination-tips": <MapPin size={20} />,
      promotional: <Mail size={20} />,
      "real-time-updates": <Bell size={20} />,
      "check-in-reminders": <Calendar size={20} />,
      "weather-alerts": <Globe size={20} />,
    };

    return notifications.map((notification) => ({
      ...notification,
      icon: iconMap[notification.id] || <Bell size={20} />,
    }));
  };

  const loadNotificationSettings = async () => {
    const response = await profileService.getNotificationSettings();

    if (response.success && response.data) {
      setEmailNotifications(
        addIconsToNotifications(response.data.emailNotifications)
      );
      setPushNotifications(
        addIconsToNotifications(response.data.pushNotifications)
      );
    } else {
      // Use default settings if no settings found or error occurred
      setEmailNotifications(defaultEmailNotifications);
      setPushNotifications(defaultPushNotifications);
    }
  };

  const handleEmailToggle = (id: string) => {
    setEmailNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
    clearMessages();
  };

  const handlePushToggle = (id: string) => {
    setPushNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
    clearMessages();
  };

  const handleFrequencyChange = (id: string, frequency: string) => {
    setEmailNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, frequency } : notification
      )
    );
    clearMessages();
  };

  const handleSave = async () => {
    setLoading(true);

    // Remove icons before sending to server
    const emailNotificationsForServer = emailNotifications.map(
      ({ icon, ...rest }) => rest
    );
    const pushNotificationsForServer = pushNotifications.map(
      ({ icon, ...rest }) => rest
    );

    const settings: NotificationSettings = {
      emailNotifications: emailNotificationsForServer,
      pushNotifications: pushNotificationsForServer,
    };

    const response = await profileService.updateNotificationSettings(settings);

    if (response.success) {
      setSuccess(response.message);
      // Update local state with server response if provided
      if (response.data) {
        setEmailNotifications(
          addIconsToNotifications(response.data.emailNotifications)
        );
        setPushNotifications(
          addIconsToNotifications(response.data.pushNotifications)
        );
      }
    } else {
      setError(response.message);
    }
  };

  return (
    <>
      <ProfileHeader>
        <h1>Configurações de Notificações</h1>
      </ProfileHeader>

      <NotificationsContainer>
        {/* Feedback Messages */}
        {loading && (
          <FeedbackMessage type="loading" message="Salvando configurações..." />
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

        {/* Notificações por Email */}
        <NotificationSection>
          <SectionTitle>
            <Mail size={24} style={{ color: colors.primary.cyan }} />
            Notificações por Email
          </SectionTitle>
          <SectionDescription>
            Configure quando e como você deseja receber emails da Flya
          </SectionDescription>

          {emailNotifications.map((notification) => (
            <NotificationCard key={notification.id}>
              <NotificationHeader>
                <NotificationIcon enabled={notification.enabled}>
                  {notification.icon}
                </NotificationIcon>
                <NotificationInfo>
                  <NotificationTitle>{notification.title}</NotificationTitle>
                  <NotificationDescription>
                    {notification.description}
                  </NotificationDescription>
                </NotificationInfo>
                <NotificationToggle>
                  <ToggleSwitch
                    enabled={notification.enabled}
                    onClick={() => handleEmailToggle(notification.id)}
                  >
                    <ToggleSlider enabled={notification.enabled} />
                  </ToggleSwitch>
                </NotificationToggle>
              </NotificationHeader>

              {notification.hasFrequency && notification.enabled && (
                <NotificationFrequency>
                  <FrequencyLabel>Frequência:</FrequencyLabel>
                  <FrequencySelect
                    value={notification.frequency}
                    onChange={(e) =>
                      handleFrequencyChange(notification.id, e.target.value)
                    }
                  >
                    <option value="instant">Instantâneo</option>
                    <option value="daily">Diário</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensal</option>
                  </FrequencySelect>
                </NotificationFrequency>
              )}
            </NotificationCard>
          ))}
        </NotificationSection>

        {/* Notificações Push */}
        <NotificationSection>
          <SectionTitle>
            <Smartphone size={24} style={{ color: colors.primary.purple }} />
            Notificações Push
          </SectionTitle>
          <SectionDescription>
            Receba notificações instantâneas no seu dispositivo
          </SectionDescription>

          {pushNotifications.map((notification) => (
            <NotificationCard key={notification.id}>
              <NotificationHeader>
                <NotificationIcon enabled={notification.enabled}>
                  {notification.icon}
                </NotificationIcon>
                <NotificationInfo>
                  <NotificationTitle>{notification.title}</NotificationTitle>
                  <NotificationDescription>
                    {notification.description}
                  </NotificationDescription>
                </NotificationInfo>
                <NotificationToggle>
                  <ToggleSwitch
                    enabled={notification.enabled}
                    onClick={() => handlePushToggle(notification.id)}
                  >
                    <ToggleSlider enabled={notification.enabled} />
                  </ToggleSwitch>
                </NotificationToggle>
              </NotificationHeader>
            </NotificationCard>
          ))}
        </NotificationSection>

        <SaveButton onClick={handleSave} disabled={loading}>
          {loading ? "Salvando..." : "Salvar Configurações"}
        </SaveButton>
      </NotificationsContainer>
    </>
  );
};

export default NotificationsPage;
