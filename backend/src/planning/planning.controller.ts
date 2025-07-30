import { Controller, Post, Body } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { CreatePlanningDto } from './dto/create-planning.dto';

@Controller('planning')
export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  @Post()
  create(@Body() createPlanningDto: CreatePlanningDto) {
    return this.planningService.create(createPlanningDto);
  }
}
