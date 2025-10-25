import { Controller, Delete, Headers, UnauthorizedException, Patch, Body, Get } from '@nestjs/common';
import { SecurityService } from './security.service';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { Toggle2FADto } from '../dto/toggle-2fa.dto';

@Controller('profile/security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Patch('password')
  async changePassword(
    @Headers('authorization') authHeader: string,
    @Body() passwordData: ChangePasswordDto
  ) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }
    
    const token = authHeader.substring(7);
    return this.securityService.changePassword(token, passwordData);
  }

  @Get()
  async getSecuritySettings(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }
    
    const token = authHeader.substring(7);
    return this.securityService.getSecuritySettings(token);
  }

  @Patch('2fa')
  async toggleTwoFactor(
    @Headers('authorization') authHeader: string,
    @Body() data: Toggle2FADto
  ) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }
    
    const token = authHeader.substring(7);
    return this.securityService.toggleTwoFactor(token, data.enabled);
  }

  @Delete('sessions')
  async terminateAllSessions(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }
    
    const token = authHeader.substring(7);
    return this.securityService.terminateAllSessions(token);
  }

  @Delete('account')
  async deleteAccount(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }
    
    const token = authHeader.substring(7);
    return this.securityService.deleteAccount(token);
  }
}