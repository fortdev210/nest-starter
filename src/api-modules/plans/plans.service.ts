import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}

  async create(createPlanDto: CreatePlanDto) {
    const { user_id, type, health_info, eating_info, goal_info } =
      createPlanDto;

    const plan = await this.prisma.plan.create({
      data: {
        user_id,
        type,
      },
    });

    const plan_id = plan.id;

    // Add eating info.
    await this.prisma.eatingInfo.create({
      data: {
        ...eating_info,
        plan_id,
      },
    });

    // Add goal
    await this.prisma.goalInfo.create({
      data: {
        plan_id,
        ...goal_info,
      },
    });

    // Add health info
    await this.prisma.healthInfo.create({
      data: {
        plan_id,
        ...health_info,
      },
    });
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
