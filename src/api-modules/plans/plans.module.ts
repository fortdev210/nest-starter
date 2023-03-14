import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';

@Module({
  controllers: [PlansController],
  providers: [PlansService],
  imports: [PrismaModule],
})
export class PlansModule {}
