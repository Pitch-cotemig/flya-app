import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthRepository } from '../repositories/supabase/auth-repository';
import { AuthDto } from '../dtos/auth/auth-dto';
import { LoginDto } from '../dtos/auth/login-dto';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signUp(authDto: AuthDto) {
    if (authDto.password !== authDto.confirmPassword) {
      throw new BadRequestException('As senhas não coincidem');
    }

    const { data: authData, error: authError } =
      await this.authRepository.createUser(authDto.email, authDto.password);

    if (authError) {
      throw new UnauthorizedException(authError.message);
    }

    if (!authData.user) {
      throw new UnauthorizedException('Erro ao criar usuário');
    }

    const profileData = {
      id: authData.user.id,
      username: authDto.username,
      first_name: authDto.firstName,
      last_name: authDto.lastName,
      email: authDto.email,
      birth_date: authDto.birthDate,
      full_name: `${authDto.firstName} ${authDto.lastName}`,
    };

    const { error: profileError } =
      await this.authRepository.createProfile(profileData);

    if (profileError) {
      await this.authRepository.deleteUser(authData.user.id);
      throw new BadRequestException('Erro ao criar perfil do usuário');
    }

    await this.authRepository.createSecuritySettings(authData.user.id);
    await this.authRepository.createNotificationSettings(authData.user.id);

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
    const { data, error } = await this.authRepository.signInUser(
      loginDto.email,
      loginDto.password,
    );

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    if (!data.user || !data.session) {
      throw new UnauthorizedException(
        'User or session not found after sign in.',
      );
    }

    const { data: profile, error: profileError } =
      await this.authRepository.getProfileById(data.user.id);

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

      const { data: profile, error: profileError } =
        await this.authRepository.getProfileById(user.id);

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
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.authRepository.save2FACode(email, code, expiresAt.toISOString());

    try {
      const nodemailer = require('nodemailer');

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
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
        `,
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
    const { data, error } = await this.authRepository.get2FACode(email, code);

    if (error || !data) {
      return false;
    }

    await this.authRepository.delete2FACode(email);
    return true;
  }

  async signInWith2FA(loginDto: LoginDto) {
    const { data, error } = await this.authRepository.signInUser(
      loginDto.email,
      loginDto.password,
    );

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    const { data: profile } = await this.authRepository.getProfileByEmail(
      loginDto.email,
    );

    if (profile?.two_factor_enabled) {
      this.tempLoginData.set(loginDto.email, data);
      await this.send2FACode(loginDto.email);
      return { requiresTwoFactor: true, message: 'Código 2FA enviado' };
    }

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
    const { data: profile, error: profileError } =
      await this.authRepository.getProfileById(data.user.id);

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
    const userValidation = await this.validateToken(token);

    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const { data: profile, error: selectError } =
      await this.authRepository.get2FAStatus(userValidation.user.id);

    if (selectError) {
      throw new BadRequestException(
        'Erro ao buscar perfil: ' + selectError.message,
      );
    }

    const currentStatus = profile?.two_factor_enabled || false;
    const newStatus = !currentStatus;

    const { error: updateError } = await this.authRepository.update2FAStatus(
      userValidation.user.id,
      newStatus,
    );

    if (updateError) {
      throw new BadRequestException(
        'Erro ao atualizar 2FA: ' + updateError.message,
      );
    }

    return { two_factor_enabled: newStatus };
  }

  async get2FAStatus(token: string) {
    const userValidation = await this.validateToken(token);

    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const { data: profile, error } = await this.authRepository.get2FAStatus(
      userValidation.user.id,
    );

    if (error) {
      throw new BadRequestException('Erro ao buscar perfil: ' + error.message);
    }

    return { two_factor_enabled: profile?.two_factor_enabled || false };
  }
}
