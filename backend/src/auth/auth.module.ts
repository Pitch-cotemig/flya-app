import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { JwtGuard } from './jwt.guard';

@Module({
  imports: [SupabaseModule],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard],
  exports: [JwtGuard],
})
export class AuthModule {}
