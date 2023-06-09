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

    const eatingInfo = await this.prisma.eatingInfo.create({
      data: {
        ...eating_info,
      },
    });

    let healthInfo = null;
    let goalInfo = null;

    if (goal_info) {
      goalInfo = await this.prisma.goalInfo.create({
        data: {
          ...goal_info,
        },
      });
    }

    if (health_info) {
      healthInfo = await this.prisma.healthInfo.create({
        data: {
          ...health_info,
        },
      });
    }

    const plan = await this.prisma.plan.create({
      data: {
        user_id,
        type,
        health_info_id: healthInfo ? healthInfo.id : null,
        goal_info_id: goalInfo ? goalInfo.id : null,
        eating_info_id: eatingInfo.id,
      },
    });

    return {
      status: 'successfully created',
    };
  }

  findAll() {
    return this.prisma.plan.findMany({
      include: { eating_info: true, goal_info: true, health_info: true},
    });
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
