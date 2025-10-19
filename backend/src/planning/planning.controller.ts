import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { JwtGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('planning')
export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  @Post()
  create(@Body() createPlanningDto: CreatePlanningDto, @Req() req: any) {
    const userId = req.user.id;
    return this.planningService.create(createPlanningDto, userId);
  }
}
