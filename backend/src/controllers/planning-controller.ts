import { Controller, Post, Body } from '@nestjs/common';
import { PlanningService } from '../services/planning-service';
import { CreatePlanningDto } from '../dtos/planning/planning-dto';

@Controller('planning')
export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  @Post()
  create(@Body() createPlanningDto: CreatePlanningDto) {
    return this.planningService.create(createPlanningDto);
  }
}
