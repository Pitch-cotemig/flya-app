import { Module } from '@nestjs/common';
import { TripsService } from '../services/trips-service';
import { TripsRepository } from '../repositories/supabase/trips-repository';
import { TripsController } from '../controllers/trips-controller';
import { SupabaseModule } from 'src/config/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [TripsController],
  providers: [TripsService, TripsRepository],
})
export class TripsModule {}
