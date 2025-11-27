import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ProfileController } from '../controllers/profile/profile-controller';
import { ProfileService } from '../services/profile/profile-service';
import { ProfileRepository } from '../repositories/supabase/profile/profile-repository';
import { SecurityController } from '../controllers/profile/security-controller';
import { SecurityService } from '../services/profile/security-service';
import { SecurityRepository } from '../repositories/supabase/profile/security-repository';
import { NotificationsController } from '../controllers/profile/notifications-controller';
import { NotificationsService } from '../services/profile/notifications-service';
import { NotificationsRepository } from '../repositories/supabase/profile/notifications-repository';
import { SupabaseModule } from '../config/supabase/supabase.module';
import { AuthModule } from './auth-model';

@Module({
  imports: [
    SupabaseModule,
    AuthModule,
    MulterModule.register({
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Apenas imagens são permitidas'), false);
        }
      },
    }),
  ],
  controllers: [ProfileController, SecurityController, NotificationsController],
  providers: [
    ProfileService,
    ProfileRepository,
    SecurityService,
    SecurityRepository,
    NotificationsService,
    NotificationsRepository,
  ],
})
export class ProfileModule {}
