import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}

  async create(createPlanDto: CreatePlanDto) {
    const { user_id, type, health_info, eating_info, goal_info } =
      createPlanDto;

    const healthInfo = await this.prisma.healthInfo.create({
      data: {
        ...health_info,
      },
    });

    const eatingInfo = await this.prisma.eatingInfo.create({
      data: {
        ...eating_info,
      },
    });

    const goalInfo = await this.prisma.goalInfo.create({
      data: {
        ...goal_info,
      },
    });

    const plan = await this.prisma.plan.create({
      data: {
        user_id,
        type,
        health_info_id: healthInfo.id,
        goal_info_id: goalInfo.id,
        eating_info_id: eatingInfo.id,
      },
    });

    return {
      status: 'successfully created',
    };
  }

  findAll() {
    return this.prisma.plan.findMany();
  }

  findOne(id: string) {
    return this.prisma.plan.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updatePlanDto: UpdatePlanDto) {
    return 'updated';
  }

  remove(id: string) {
    return this.prisma.plan.delete({
      where: {
        id,
      },
    });
  }
}
