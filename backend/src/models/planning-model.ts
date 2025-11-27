import { Module } from '@nestjs/common';
import { PlanningService } from '../services/planning-service';
import { PlanningController } from '../controllers/planning-controller';
import { AiModule } from './ai-model';
import { SupabaseModule } from '../config/supabase/supabase.module';

@Module({
  imports: [AiModule, SupabaseModule],
  controllers: [PlanningController],
  providers: [PlanningService],
})
export class PlanningModule {}
