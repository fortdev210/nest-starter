import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}

  create(createPlanDto: CreatePlanDto) {
    // return this.prisma.plan.create({
    //   data: createPlanDto,
    // });
  }

  findAll() {
    return this.prisma.plan.findMany();
  }

  findOne(id: string) {
    return this.prisma.plan.findUnique({
      where: {
        id: id,
      },
      include: {
        eating_info: true,
        health_info: true,
        goal_info: true,
        user: true,
      },
    });
  }

  update(id: string, updatePlanDto: UpdatePlanDto) {}

  remove(id: string) {
    return this.prisma.plan.delete({
      where: {
        id,
      },
    });
  }
}
