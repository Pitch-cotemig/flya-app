import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { DashboardService } from '../services/dashboard-service';
import { JwtGuard } from 'src/middlewares/auth/jwt.guard';
import { DashboardStatsDto } from '../dtos/dashboard/dashboard-dto';

@UseGuards(JwtGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  async getStats(@Req() req): Promise<DashboardStatsDto> {
    const userId = req.user.id;
    return this.dashboardService.getStats(userId);
  }
}
