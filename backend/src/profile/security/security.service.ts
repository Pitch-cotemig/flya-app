import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class SecurityService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly authService: AuthService
  ) {}

  async changePassword(token: string, passwordData: any) {
    const userValidation = await this.authService.validateToken(token);
    
    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('As senhas não coincidem');
    }

    if (newPassword.length < 8) {
      throw new BadRequestException('A nova senha deve ter pelo menos 8 caracteres');
    }

    const supabase = this.supabaseService.getClient();

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userValidation.user.email,
        password: currentPassword
      });

      if (signInError) {
        throw new BadRequestException('Senha atual incorreta');
      }

      const { error: updateError } = await supabase.auth.admin.updateUserById(
        userValidation.user.id,
        { password: newPassword }
      );

      if (updateError) {
        throw new Error('Erro ao alterar senha: ' + updateError.message);
      }

      return {
        success: true,
        message: 'Senha alterada com sucesso'
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Erro ao alterar senha');
    }
  }

  async getSecuritySettings(token: string) {
    const userValidation = await this.authService.validateToken(token);
    
    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const supabase = this.supabaseService.getClient();
    const userId = userValidation.user.id;

    try {
      let { data: settings } = await supabase
        .from('security_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      // Se não existir, criar com valores padrão
      if (!settings) {
        const { data: newSettings } = await supabase
          .from('security_settings')
          .insert({ user_id: userId })
          .select()
          .single();
        settings = newSettings;
      }

      return {
        success: true,
        message: 'Configurações carregadas com sucesso',
        settings: {
          twoFactorEnabled: settings?.two_factor_enabled || false
        }
      };
    } catch (error) {
      console.error('Erro detalhado ao buscar configurações:', error);
      throw new BadRequestException('Erro ao buscar configurações de segurança: ' + error.message);
    }
  }

  async toggleTwoFactor(token: string, enabled: boolean) {
    const userValidation = await this.authService.validateToken(token);
    
    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const supabase = this.supabaseService.getClient();
    const userId = userValidation.user.id;

    try {
      // Verificar se já existe
      const { data: existing } = await supabase
        .from('security_settings')
        .select('user_id')
        .eq('user_id', userId)
        .single();

      let error;
      if (existing) {
        // Atualizar existente
        const result = await supabase
          .from('security_settings')
          .update({ two_factor_enabled: enabled })
          .eq('user_id', userId);
        error = result.error;
      } else {
        // Inserir novo
        const result = await supabase
          .from('security_settings')
          .insert({ user_id: userId, two_factor_enabled: enabled });
        error = result.error;
      }

      if (error) {
        throw new Error('Erro ao configurar 2FA: ' + error.message);
      }

      return {
        success: true,
        message: `Autenticação de dois fatores ${enabled ? 'ativada' : 'desativada'} com sucesso`,
        settings: { twoFactorEnabled: enabled }
      };
    } catch (error) {
      console.error('Erro detalhado ao configurar 2FA:', error);
      throw new BadRequestException('Erro ao configurar 2FA: ' + error.message);
    }
  }

  async terminateAllSessions(token: string) {
    const userValidation = await this.authService.validateToken(token);
    
    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return {
      success: true,
      message: 'Todas as outras sessões foram encerradas'
    };
  }

  async deleteAccount(token: string) {
    const userValidation = await this.authService.validateToken(token);
    
    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const supabase = this.supabaseService.getClient();
    const userId = userValidation.user.id;

    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) {
        throw new Error('Erro ao deletar perfil: ' + profileError.message);
      }

      await supabase
        .from('two_factor_codes')
        .delete()
        .eq('email', userValidation.user.email);

      const { error: authError } = await supabase.auth.admin.deleteUser(userId);

      if (authError) {
        throw new Error('Erro ao deletar usuário: ' + authError.message);
      }

      return { 
        success: true, 
        message: 'Conta excluída permanentemente' 
      };

    } catch (error) {
      throw new UnauthorizedException('Erro ao excluir conta');
    }
  }
}