import { Module } from '@nestjs/common';
import { BagsController } from './bags.controller';
import { BagsService } from './bags.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [BagsController],
  providers: [BagsService],
})
export class BagsModule {}
