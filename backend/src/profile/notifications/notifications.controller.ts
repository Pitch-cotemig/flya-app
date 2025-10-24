import { Controller, Headers, UnauthorizedException, Put, Body, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('profile/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getNotificationSettings(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }
    
    const token = authHeader.substring(7);
    return this.notificationsService.getNotificationSettings(token);
  }

  @Put()
  async updateNotificationSettings(
    @Headers('authorization') authHeader: string,
    @Body() settings: any
  ) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }
    
    const token = authHeader.substring(7);
    return this.notificationsService.updateNotificationSettings(token, settings);
  }
}