import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from '../../services/auth-service';
import { NotificationsRepository } from '../../repositories/supabase/profile/notifications-repository';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly authService: AuthService,
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async getNotificationSettings(token: string) {
    const userValidation = await this.authService.validateToken(token);

    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const userId = userValidation.user.id;

    try {
      const { data: settings } =
        await this.notificationsRepository.getNotificationSettings(userId);

      if (!settings) {
        throw new BadRequestException(
          'Configurações de notificação não encontradas',
        );
      }

      const response = {
        email: {
          tripUpdates: {
            enabled: settings.email_trip_updates,
            ...(settings.email_trip_updates && {
              frequency: settings.email_trip_updates_freq,
            }),
          },
          bookingConfirmations: {
            enabled: settings.email_booking_confirmations,
          },
          destinationTips: {
            enabled: settings.email_destination_tips,
            ...(settings.email_destination_tips && {
              frequency: settings.email_destination_tips_freq,
            }),
          },
          promotionalOffers: {
            enabled: settings.email_promotional_offers,
            ...(settings.email_promotional_offers && {
              frequency: settings.email_promotional_offers_freq,
            }),
          },
        },
        push: {
          realtimeUpdates: {
            enabled: settings.push_realtime_updates,
          },
          checkinReminders: {
            enabled: settings.push_checkin_reminders,
          },
          weatherAlerts: {
            enabled: settings.push_weather_alerts,
          },
        },
      };

      return {
        success: true,
        message: 'Configurações carregadas com sucesso',
        settings: response,
      };
    } catch (error) {
      throw new UnauthorizedException('Erro ao buscar configurações');
    }
  }

  async updateNotificationSettings(token: string, settings: any) {
    const userValidation = await this.authService.validateToken(token);

    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const validFrequencies = ['instantaneo', 'diario', 'semanal', 'mensal'];
    const allowedFrequencyFields = [
      'tripUpdates',
      'destinationTips',
      'promotionalOffers',
    ];

    if (settings.email?.confirmacoesReserva?.frequency) {
      throw new BadRequestException(
        'Campo confirmacoesReserva não aceita frequency',
      );
    }
    if (settings.push?.atualizacoesTempoReal?.frequency) {
      throw new BadRequestException(
        'Campo atualizacoesTempoReal não aceita frequency',
      );
    }
    if (settings.push?.lembretesCheckIn?.frequency) {
      throw new BadRequestException(
        'Campo lembretesCheckIn não aceita frequency',
      );
    }
    if (settings.push?.alertasClima?.frequency) {
      throw new BadRequestException('Campo alertasClima não aceita frequency');
    }

    const userId = userValidation.user.id;

    try {
      const normalizeFrequency = (freq: string) => {
        return freq
          .trim()
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      };

      const frequenciesToValidate = [
        settings.email?.atualizacoesViagem?.frequency,
        settings.email?.dicasDestino?.frequency,
        settings.email?.ofertasPromocionais?.frequency,
      ].filter(Boolean);

      for (const freq of frequenciesToValidate) {
        const normalizedFreq = normalizeFrequency(freq);
        if (!validFrequencies.includes(normalizedFreq)) {
          throw new BadRequestException(
            `Frequência inválida: ${freq}. Use: instantaneo, diario, semanal ou mensal`,
          );
        }
      }

      const updateData = {
        email_trip_updates:
          settings.email?.atualizacoesViagem?.enabled || false,
        email_trip_updates_freq: settings.email?.atualizacoesViagem?.frequency
          ? normalizeFrequency(settings.email.atualizacoesViagem.frequency)
          : 'instantaneo',
        email_booking_confirmations:
          settings.email?.confirmacoesReserva?.enabled || false,
        email_destination_tips: settings.email?.dicasDestino?.enabled || false,
        email_destination_tips_freq: settings.email?.dicasDestino?.frequency
          ? normalizeFrequency(settings.email.dicasDestino.frequency)
          : 'diario',
        email_promotional_offers:
          settings.email?.ofertasPromocionais?.enabled || false,
        email_promotional_offers_freq: settings.email?.ofertasPromocionais
          ?.frequency
          ? normalizeFrequency(settings.email.ofertasPromocionais.frequency)
          : 'semanal',
        push_realtime_updates:
          settings.push?.atualizacoesTempoReal?.enabled || false,
        push_checkin_reminders:
          settings.push?.lembretesCheckIn?.enabled || false,
        push_weather_alerts: settings.push?.alertasClima?.enabled || false,
      };

      const { data: existing } =
        await this.notificationsRepository.checkNotificationSettingsExists(
          userId,
        );

      let error;
      if (existing) {
        const result =
          await this.notificationsRepository.updateNotificationSettings(
            userId,
            updateData,
          );
        error = result.error;
      } else {
        const result =
          await this.notificationsRepository.createNotificationSettings(
            userId,
            updateData,
          );
        error = result.error;
      }

      if (error) {
        throw new Error('Erro ao salvar: ' + error.message);
      }

      return {
        success: true,
        message: 'Configurações de notificação salvas com sucesso',
        settings,
      };
    } catch (error) {
      console.error('Erro ao salvar notificações:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException(
        'Erro ao salvar configurações: ' + error.message,
      );
    }
  }
}
