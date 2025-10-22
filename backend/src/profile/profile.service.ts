import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly authService: AuthService
  ) {}

  async deleteAccount(token: string) {
    // Validar token e obter usuário
    const userValidation = await this.authService.validateToken(token);
    
    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const supabase = this.supabaseService.getClient();
    const userId = userValidation.user.id;

    try {
      // Deletar perfil do usuário
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) {
        throw new Error('Erro ao deletar perfil: ' + profileError.message);
      }

      // Deletar códigos 2FA
      await supabase
        .from('two_factor_codes')
        .delete()
        .eq('email', userValidation.user.email);

      // Deletar usuário do auth
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);

      if (authError) {
        throw new Error('Erro ao deletar usuário: ' + authError.message);
      }

      return { 
        success: true, 
        message: 'Conta excluída permanentemente' 
      };

    } catch (error) {
      console.error('Erro ao deletar conta:', error);
      throw new UnauthorizedException('Erro ao excluir conta');
    }
  }
}