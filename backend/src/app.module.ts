import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { PlanningModule } from './planning/planning.module';
import { AiModule } from './ai/ai.module';
import { TripsModule } from './trips/trips.module';
import { ProfileModule } from './profile/profile.module';
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
