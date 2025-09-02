import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './jwt.guard';
import { Send2FADto, Verify2FADto } from './dto/two-factor.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }

  @Post('signin')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @Post('validate')
  async validate(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Token não fornecido');
    }

    const token = authHeader.substring(7); // Remove 'Bearer '
    return this.authService.validateToken(token);
  }

  @Post('2fa/send')
  async send2FA(@Body() body: Send2FADto) {
    const code = await this.authService.send2FACode(body.email);
    return { message: 'Código enviado', code }; // só para teste, não retornar em produção
  }

  @Post('2fa/verify')
  async verify2FA(@Body() body: Verify2FADto) {
    const verified = await this.authService.verify2FACode(
      body.email,
      body.code,
    );
    return { verified };
  }
}
