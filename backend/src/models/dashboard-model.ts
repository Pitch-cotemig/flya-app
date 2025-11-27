import { Module } from '@nestjs/common';
import { DashboardController } from '../controllers/dashboard-controller';
import { DashboardService } from '../services/dashboard-service';
import { SupabaseModule } from 'src/config/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
