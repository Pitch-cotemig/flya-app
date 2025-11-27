import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth-controller';
import { AuthService } from '../services/auth-service';
import { AuthRepository } from '../repositories/supabase/auth-repository';
import { SupabaseModule } from 'src/config/supabase/supabase.module';
import { JwtGuard } from '../middlewares/auth/jwt.guard';

@Module({
  imports: [SupabaseModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtGuard],
  exports: [AuthService, AuthRepository, JwtGuard],
})
export class AuthModule {}
