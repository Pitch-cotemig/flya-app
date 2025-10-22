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
        two_factor_enabled: profile?.two_factor_enabled || false,
      },
      token: data.session.access_token,
    };
  }

  async validateToken(token: string) {
    try {
      // Criar cliente com chave anon para validar tokens de usuário
      const { createClient } = require('@supabase/supabase-js');
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
      
      const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
      
      const {
        data: { user },
        error,
      } = await supabaseAnon.auth.getUser(token);

      if (error || !user) {
        throw new UnauthorizedException('Token inválido');
      }

      // Usar cliente service para buscar dados do perfil
      const supabase = this.supabaseService.getClient();
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
          two_factor_enabled: profile?.two_factor_enabled || false,
        },
      };
    } catch (error) {
      throw error;
    }
  }
  async send2FACode(email: string) {
    const code = randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos
    
    const supabase = this.supabaseService.getClient();
    
    // Salvar código no banco
    await supabase.from('two_factor_codes').upsert({
      email,
      code,
      expires_at: expiresAt.toISOString()
    });
    
    // Enviar email usando Nodemailer
    try {
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      
      const info = await transporter.sendMail({
        from: `"Flya" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Código 2FA - Flya',
        text: `Seu código de verificação é: ${code}. Válido por 5 minutos.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #3b82f6; text-align: center;">Código de Verificação</h2>
            <p>Seu código de verificação em duas etapas é:</p>
            <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 20px 0; border-radius: 8px;">
              ${code}
            </div>
            <p><strong>Este código é válido por 5 minutos.</strong></p>
            <p>Se você não solicitou este código, ignore este email.</p>
            <hr style="margin: 30px 0;">
            <p style="color: #6b7280; font-size: 14px; text-align: center;">
              Flya - Sua parceira para viagem da sua vida
            </p>
          </div>
        `
      });
      
      console.log(`Email 2FA enviado para ${email} - ID: ${info.messageId}`);
      console.log(`Código: ${code}`);
      
    } catch (emailError) {
      console.error('Erro ao enviar email:', emailError);
      console.log(`FALLBACK - Código para ${email}: ${code}`);
    }
    
    return { message: 'Código enviado para seu email' };
  }

  async verify2FACode(email: string, code: string): Promise<boolean> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('two_factor_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .gt('expires_at', new Date().toISOString())
      .single();
    
    if (error || !data) {
      return false;
    }
    
    // Remover código após uso
    await supabase.from('two_factor_codes').delete().eq('email', email);
    
    return true;
  }

  async signInWith2FA(loginDto: LoginDto) {
    // Primeiro, validar credenciais
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginDto.email,
      password: loginDto.password,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    // Verificar se 2FA está habilitado
    const { data: profile } = await supabase
      .from('profiles')
      .select('two_factor_enabled')
      .eq('email', loginDto.email)
      .single();

    if (profile?.two_factor_enabled) {
      // Salvar dados temporários para completar login depois
      this.tempLoginData.set(loginDto.email, data);
      // Enviar código 2FA
      await this.send2FACode(loginDto.email);
      return { requiresTwoFactor: true, message: 'Código 2FA enviado' };
    }

    // Login normal se 2FA não estiver habilitado
    return this.completeLogin(data);
  }

  private tempLoginData = new Map<string, any>();

  async complete2FALogin(email: string) {
    const data = this.tempLoginData.get(email);
    if (!data) {
      throw new UnauthorizedException('Sessão expirada');
    }
    this.tempLoginData.delete(email);
    return this.completeLogin(data);
  }

  private async completeLogin(data: any) {
    const supabase = this.supabaseService.getClient();
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
        two_factor_enabled: profile?.two_factor_enabled || false,
      },
      token: data.session.access_token,
    };
  }

  async toggle2FA(token: string) {
    // Validar token
    const userValidation = await this.validateToken(token);
    
    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const supabase = this.supabaseService.getClient();
    
    // Buscar status atual do 2FA
    const { data: profile, error: selectError } = await supabase
      .from('profiles')
      .select('two_factor_enabled')
      .eq('id', userValidation.user.id)
      .single();
    
    if (selectError) {
      throw new BadRequestException('Erro ao buscar perfil: ' + selectError.message);
    }
    
    const currentStatus = profile?.two_factor_enabled || false;
    const newStatus = !currentStatus;
    
    // Atualizar status do 2FA
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ two_factor_enabled: newStatus })
      .eq('id', userValidation.user.id);
    
    if (updateError) {
      throw new BadRequestException('Erro ao atualizar 2FA: ' + updateError.message);
    }
    
    return { two_factor_enabled: newStatus };
  }

  async get2FAStatus(token: string) {
    const userValidation = await this.validateToken(token);
    
    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const supabase = this.supabaseService.getClient();
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('two_factor_enabled')
      .eq('id', userValidation.user.id)
      .single();
    
    if (error) {
      throw new BadRequestException('Erro ao buscar perfil: ' + error.message);
    }
    
    return { two_factor_enabled: profile?.two_factor_enabled || false };
  }
}
