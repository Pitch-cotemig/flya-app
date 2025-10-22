import { Controller, Delete, Headers, UnauthorizedException } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Delete()
  async deleteAccount(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }
    
    const token = authHeader.substring(7);
    return this.profileService.deleteAccount(token);
  }
}