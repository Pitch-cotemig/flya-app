import { Module } from '@nestjs/common';
import { PlanningService } from '../services/planning-service';
import { PlanningController } from '../controllers/planning-controller';
import { AiModule } from './ai-model';

@Module({
  imports: [AiModule],
  controllers: [PlanningController],
  providers: [PlanningService],
})
export class PlanningModule {}
