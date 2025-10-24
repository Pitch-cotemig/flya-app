import { Controller, Headers, UnauthorizedException, Put, Body, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }
    
    const token = authHeader.substring(7);
    return this.profileService.getProfile(token);
  }

  @Put()
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfile(
    @Headers('authorization') authHeader: string,
    @Body() profileData: UpdateProfileDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }
    
    const token = authHeader.substring(7);
    return this.profileService.updateProfile(token, profileData, file);
  }


}