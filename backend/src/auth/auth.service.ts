import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async signUp(authDto: AuthDto) {
    // Validar se as senhas coincidem
    if (authDto.password !== authDto.confirmPassword) {
      throw new BadRequestException('As senhas não coincidem');
    }

    const supabase = this.supabaseService.getClient();

    // Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: authDto.email,
      password: authDto.password,
    });

    if (authError) {
      throw new UnauthorizedException(authError.message);
    }

    if (!authData.user) {
      throw new UnauthorizedException('Erro ao criar usuário');
    }

    // Criar perfil do usuário na tabela profiles
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      username: authDto.username,
      first_name: authDto.firstName,
      last_name: authDto.lastName,
      email: authDto.email,
      birth_date: authDto.birthDate,
      full_name: `${authDto.firstName} ${authDto.lastName}`,
    });

    if (profileError) {
      // Se der erro ao criar o perfil, deletar o usuário criado
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw new BadRequestException('Erro ao criar perfil do usuário');
    }

    return {
      user: {
        id: authData.user.id,
        email: authData.user.email,
        username: authDto.username,
        firstName: authDto.firstName,
        lastName: authDto.lastName,
        fullName: `${authDto.firstName} ${authDto.lastName}`,
        birthDate: authDto.birthDate,
      },
      token: authData.session?.access_token,
    };
  }

  async signIn(loginDto: LoginDto) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginDto.email,
      password: loginDto.password,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    if (!data.user || !data.session) {
      throw new UnauthorizedException(
        'User or session not found after sign in.',
      );
    }

    // Buscar dados do perfil
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      throw new UnauthorizedException('Erro ao buscar perfil do usuário');
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        username: profile?.username,
        firstName: profile?.first_name,
        lastName: profile?.last_name,
        fullName: profile?.full_name,
        birthDate: profile?.birth_date,
      },
      token: data.session.access_token,
    };
  }

  async validateToken(token: string) {
    const supabase = this.supabaseService.getClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw new UnauthorizedException('Token inválido');
    }

    // Buscar dados do perfil
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      throw new UnauthorizedException('Erro ao buscar perfil do usuário');
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        username: profile?.username,
        firstName: profile?.first_name,
        lastName: profile?.last_name,
        fullName: profile?.full_name,
        birthDate: profile?.birth_date,
      },
    };
  }
  private twoFactorCodes = new Map<string, string>(); // armazenar códigos temporários

  async send2FACode(email: string) {
    const code = randomInt(100000, 999999).toString(); // 6 dígitos
    this.twoFactorCodes.set(email, code);

    // Aqui você pode enviar o código por e-mail ou SMS via Supabase
    const supabase = this.supabaseService.getClient();
    await supabase.from('emails').insert({ to: email, code }); // exemplo, adaptar para o seu envio real

    return code;
  }

  async verify2FACode(email: string, code: string): Promise<boolean> {
    const validCode = this.twoFactorCodes.get(email);
    if (validCode && validCode === code) {
      this.twoFactorCodes.delete(email); // remove após verificação
      return true;
    }
    return false;
  }
}
