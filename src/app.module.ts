import { Module } from '@nestjs/common';

import { PlansModule } from './api-modules/plans/plans.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, PlansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
