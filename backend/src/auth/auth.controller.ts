import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './jwt.guard';
import { Verify2FADto } from './dto/two-factor.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }

  @Post('signin')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signInWith2FA(loginDto);
  }

  @Post('validate')
  async validate(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Token não fornecido');
    }

    const token = authHeader.substring(7); // Remove 'Bearer '
    return this.authService.validateToken(token);
  }

  @Post('2fa/verify')
  async verify2FA(@Body() body: Verify2FADto) {
    const verified = await this.authService.verify2FACode(body.email, body.code);
    
    if (!verified) {
      throw new UnauthorizedException('Código inválido ou expirado');
    }
    
    // Completar login após verificação 2FA
    return this.authService.complete2FALogin(body.email);
  }

  @Post('2fa/toggle')
  async toggle2FA(@Headers('authorization') authHeader: string) {
    try {
      console.log('=== TOGGLE 2FA INICIADO ===');
      console.log('Auth header recebido:', authHeader ? 'Sim' : 'Não');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Erro: Token não fornecido ou formato inválido');
        throw new UnauthorizedException('Token não fornecido');
      }
      
      const token = authHeader.substring(7);
      console.log('Token extraído:', token.substring(0, 20) + '...');
      
      console.log('Validando token...');
      const userValidation = await this.authService.validateToken(token);
      console.log('Usuário validado:', userValidation.user?.email);
      
      if (!userValidation.user) {
        console.log('Erro: Usuário não encontrado após validação');
        throw new UnauthorizedException('Usuário não encontrado');
      }
      
      const supabase = this.authService['supabaseService'].getClient();
      
      console.log('Buscando perfil para ID:', userValidation.user.id);
      const { data: profile, error: selectError } = await supabase
        .from('profiles')
        .select('two_factor_enabled')
        .eq('id', userValidation.user.id)
        .single();
      
      console.log('Profile encontrado:', profile);
      console.log('Erro na busca:', selectError);
      
      if (selectError) {
        console.error('Erro detalhado ao buscar profile:', selectError);
        throw new UnauthorizedException('Erro ao buscar perfil: ' + selectError.message);
      }
      
      const currentStatus = profile?.two_factor_enabled || false;
      const newStatus = !currentStatus;
      console.log('Status atual:', currentStatus, '-> Novo status:', newStatus);
      
      console.log('Atualizando perfil...');
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ two_factor_enabled: newStatus })
        .eq('id', userValidation.user.id);
      
      if (updateError) {
        console.error('Erro detalhado ao atualizar:', updateError);
        throw new UnauthorizedException('Erro ao atualizar 2FA: ' + updateError.message);
      }
      
      console.log('=== 2FA ATUALIZADO COM SUCESSO ===');
      console.log('Novo status final:', newStatus);
      
      return { two_factor_enabled: newStatus };
      
    } catch (error) {
      console.error('=== ERRO NO TOGGLE 2FA ===');
      console.error('Erro completo:', error);
      throw error;
    }
  }
}
