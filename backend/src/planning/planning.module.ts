import { Module } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { PlanningController } from './planning.controller';
import { AiModule } from 'src/ai/ai.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [AiModule, SupabaseModule],
  controllers: [PlanningController],
  providers: [PlanningService],
})
export class PlanningModule {}
