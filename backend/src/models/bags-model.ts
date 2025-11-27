import { Module } from '@nestjs/common';
import { BagsController } from '../controllers/bags-controller';
import { BagsService } from '../services/bags-service';
import { SupabaseModule } from '../config/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [BagsController],
  providers: [BagsService],
})
export class BagsModule {}
