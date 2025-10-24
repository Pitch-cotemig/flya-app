import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly authService: AuthService,
    private readonly supabaseService: SupabaseService
  ) {}

  async getNotificationSettings(token: string) {
    const userValidation = await this.authService.validateToken(token);
    
    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const supabase = this.supabaseService.getClient();
    const userId = userValidation.user.id;

    try {
      const { data: settings } = await supabase
        .from('notification_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (!settings) {
        throw new BadRequestException('Configurações de notificação não encontradas');
      }

      const response = {
        email: {
          atualizacoesViagem: {
            enabled: settings.email_atualizacoes_viagem,
            ...(settings.email_atualizacoes_viagem && { frequency: settings.email_atualizacoes_viagem_freq })
          },
          confirmacoesReserva: {
            enabled: settings.email_confirmacoes_reserva
          },
          dicasDestino: {
            enabled: settings.email_dicas_destino,
            ...(settings.email_dicas_destino && { frequency: settings.email_dicas_destino_freq })
          },
          ofertasPromocionais: {
            enabled: settings.email_ofertas_promocionais,
            ...(settings.email_ofertas_promocionais && { frequency: settings.email_ofertas_promocionais_freq })
          }
        },
        push: {
          atualizacoesTempoReal: {
            enabled: settings.push_atualizacoes_tempo_real
          },
          lembretesCheckIn: {
            enabled: settings.push_lembretes_checkin
          },
          alertasClima: {
            enabled: settings.push_alertas_clima
          }
        }
      };

      return {
        success: true,
        message: 'Configurações carregadas com sucesso',
        settings: response
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
    const allowedFrequencyFields = ['atualizacoesViagem', 'dicasDestino', 'ofertasPromocionais'];
    
    // Validar se frequency só está sendo usado em campos permitidos
    if (settings.email?.confirmacoesReserva?.frequency) {
      throw new BadRequestException('Campo confirmacoesReserva não aceita frequency');
    }
    if (settings.push?.atualizacoesTempoReal?.frequency) {
      throw new BadRequestException('Campo atualizacoesTempoReal não aceita frequency');
    }
    if (settings.push?.lembretesCheckIn?.frequency) {
      throw new BadRequestException('Campo lembretesCheckIn não aceita frequency');
    }
    if (settings.push?.alertasClima?.frequency) {
      throw new BadRequestException('Campo alertasClima não aceita frequency');
    }
    
    // Validar frequências dos campos permitidos
    const frequencies = [
      settings.email?.atualizacoesViagem?.frequency,
      settings.email?.dicasDestino?.frequency,
      settings.email?.ofertasPromocionais?.frequency
    ].filter(Boolean);
    
    for (const freq of frequencies) {
      if (!validFrequencies.includes(freq)) {
        throw new BadRequestException(`Frequência inválida: ${freq}. Use: instantaneo, diario, semanal ou mensal`);
      }
    }

    const supabase = this.supabaseService.getClient();
    const userId = userValidation.user.id;

    try {
      const updateData = {
        email_atualizacoes_viagem: settings.email?.atualizacoesViagem?.enabled || false,
        email_atualizacoes_viagem_freq: settings.email?.atualizacoesViagem?.frequency || 'instantaneo',
        email_confirmacoes_reserva: settings.email?.confirmacoesReserva?.enabled || false,
        email_dicas_destino: settings.email?.dicasDestino?.enabled || false,
        email_dicas_destino_freq: settings.email?.dicasDestino?.frequency || 'diario',
        email_ofertas_promocionais: settings.email?.ofertasPromocionais?.enabled || false,
        email_ofertas_promocionais_freq: settings.email?.ofertasPromocionais?.frequency || 'semanal',
        push_atualizacoes_tempo_real: settings.push?.atualizacoesTempoReal?.enabled || false,
        push_lembretes_checkin: settings.push?.lembretesCheckIn?.enabled || false,
        push_alertas_clima: settings.push?.alertasClima?.enabled || false
      };

      // Verificar se já existe
      const { data: existing } = await supabase
        .from('notification_settings')
        .select('user_id')
        .eq('user_id', userId)
        .single();

      let error;
      if (existing) {
        // Atualizar existente
        const result = await supabase
          .from('notification_settings')
          .update(updateData)
          .eq('user_id', userId);
        error = result.error;
      } else {
        // Inserir novo
        const result = await supabase
          .from('notification_settings')
          .insert({ ...updateData, user_id: userId });
        error = result.error;
      }

      if (error) {
        throw new Error('Erro ao salvar: ' + error.message);
      }

      return {
        success: true,
        message: 'Configurações de notificação salvas com sucesso',
        settings
      };
    } catch (error) {
      console.error('Erro ao salvar notificações:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException('Erro ao salvar configurações: ' + error.message);
    }
  }
}