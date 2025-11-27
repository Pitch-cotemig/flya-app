import {
  Body,
  Controller,
  Post,
  Get,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth-service';
import { AuthDto } from '../dtos/auth/auth-dto';
import { LoginDto } from '../dtos/auth/login-dto';
import { Verify2FADto } from '../dtos/auth/two-factor-dto';

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

    const token = authHeader.substring(7);
    return this.authService.validateToken(token);
  }

  @Post('2fa/verify')
  async verify2FA(@Body() body: Verify2FADto) {
    const verified = await this.authService.verify2FACode(
      body.email,
      body.code,
    );

    if (!verified) {
      throw new UnauthorizedException('Código inválido ou expirado');
    }

    return this.authService.complete2FALogin(body.email);
  }

  @Post('2fa/toggle')
  async toggle2FA(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const token = authHeader.substring(7);
    return this.authService.toggle2FA(token);
  }

  @Get('2fa/status')
  async get2FAStatus(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const token = authHeader.substring(7);
    return this.authService.get2FAStatus(token);
  }
}
