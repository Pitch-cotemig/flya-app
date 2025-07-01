import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, AuthModule,ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
