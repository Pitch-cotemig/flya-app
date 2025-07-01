import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/signup.dto';
import { Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  signup(@Body() dto: RegisterDto) {
    console.log(dto)
    return this.authService.signup(dto.nome, dto.email, dto.password);
  }


  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    try {
      const result = await this.authService.login(dto.email, dto.password);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.log(error)
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'Credenciais inválidas',
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Erro interno no servidor',
      });
    }
  }
}