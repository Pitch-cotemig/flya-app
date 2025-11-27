import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { SecurityRepository } from '../../repositories/supabase/profile/security-repository';
import { ProfileRepository } from '../../repositories/supabase/profile/profile-repository';
import { AuthService } from '../../services/auth-service';
import { AuthRepository } from '../../repositories/supabase/auth-repository';

@Injectable()
export class SecurityService {
  constructor(
    private readonly securityRepository: SecurityRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly authService: AuthService,
    private readonly authRepository: AuthRepository,
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
      throw new BadRequestException(
        'A nova senha deve ter pelo menos 8 caracteres',
      );
    }

    try {
      const { error: signInError } = await this.authRepository.signInUser(
        userValidation.user.email,
        currentPassword,
      );

      if (signInError) {
        throw new BadRequestException('Senha atual incorreta');
      }

      const { error: updateError } =
        await this.securityRepository.updateUserPassword(
          userValidation.user.id,
          newPassword,
        );

      if (updateError) {
        throw new Error('Erro ao alterar senha: ' + updateError.message);
      }

      return {
        success: true,
        message: 'Senha alterada com sucesso',
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

    const userId = userValidation.user.id;

    try {
      let { data: settings } =
        await this.securityRepository.getSecuritySettings(userId);

      if (!settings) {
        const { data: newSettings } =
          await this.securityRepository.createSecuritySettings(userId);
        settings = newSettings;
      }

      return {
        success: true,
        message: 'Configurações carregadas com sucesso',
        settings: {
          twoFactorEnabled: settings?.two_factor_enabled || false,
        },
      };
    } catch (error) {
      console.error('Erro detalhado ao buscar configurações:', error);
      throw new BadRequestException(
        'Erro ao buscar configurações de segurança: ' + error.message,
      );
    }
  }

  async toggleTwoFactor(token: string, enabled: boolean) {
    const userValidation = await this.authService.validateToken(token);

    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const userId = userValidation.user.id;

    try {
      const { data: existing } =
        await this.securityRepository.checkSecuritySettingsExists(userId);

      let error;
      if (existing) {
        const result = await this.securityRepository.updateSecuritySettings(
          userId,
          { two_factor_enabled: enabled },
        );
        error = result.error;
      } else {
        const result =
          await this.securityRepository.createSecuritySettingsWithData(userId, {
            two_factor_enabled: enabled,
          });
        error = result.error;
      }

      if (error) {
        throw new Error('Erro ao configurar 2FA: ' + error.message);
      }

      return {
        success: true,
        message: `Autenticação de dois fatores ${enabled ? 'ativada' : 'desativada'} com sucesso`,
        settings: { twoFactorEnabled: enabled },
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
      message: 'Todas as outras sessões foram encerradas',
    };
  }

  async deleteAccount(token: string) {
    const userValidation = await this.authService.validateToken(token);

    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const userId = userValidation.user.id;

    try {
      const { error: profileError } =
        await this.profileRepository.deleteProfile(userId);

      if (profileError) {
        throw new Error('Erro ao deletar perfil: ' + profileError.message);
      }

      await this.securityRepository.delete2FACodesByEmail(
        userValidation.user.email,
      );

      const { error: authError } = await this.authRepository.deleteUser(userId);

      if (authError) {
        throw new Error('Erro ao deletar usuário: ' + authError.message);
      }

      return {
        success: true,
        message: 'Conta excluída permanentemente',
      };
    } catch (error) {
      throw new UnauthorizedException('Erro ao excluir conta');
    }
  }
}
