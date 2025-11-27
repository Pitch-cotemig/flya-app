import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './config/supabase/supabase.module';
import { AuthModule } from './models/auth-model';
import { PlanningModule } from './models/planning-model';
import { AiModule } from './models/ai-model';
import { TripsModule } from './models/trips-model';
import { ProfileModule } from './models/profile-model';
import { BagsModule } from './bags/bags.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
    }),
    SupabaseModule,
    AuthModule,
    PlanningModule,
    AiModule,
    TripsModule,
    ProfileModule,
    DashboardModule,
    BagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
