import { Test, TestingModule } from '@nestjs/testing';
import { PlansService } from './plans.service';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaClient, PlanType, HealthRate, Gender } from '@prisma/client';
import { parseISO } from 'date-fns';

describe('PlansService', () => {
  let service: PlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlansService, PrismaService],
    }).compile();

    service = module.get<PlansService>(PlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create plan', async () => {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst();

    const eating_info = {
      cooking_skill: 'Barely get by(take-out guru)',
      plan_feed_number: 5,
      allergy_food: ['dairy', 'shellfish'],
      type: 'Meat & Potatoes - what the heck are veggies',
    };
    const health_info = {
      general_rate: 'good' as HealthRate,
      chronic_condition: ['heart disease'],
      supplements_using: ['multivitamins'],
      exercise: {
        period: '5-6 days',
        time: '30 min or fewer',
        type: ['walking'],
      },
      number_of_glasses_daily_water: 5,
    };
    const goal_info = {
      gender: 'male' as Gender,
      dob: '04/17/1993',
      start_date: '04/17/2022',
      upper_arm: 5,
      hips: 5,
      waist: 5,
      thigh: 5,
      height: 65,
      weight: 60,
      highest_weight: 75,
      goal_weight: 55,
      front_photo_url: 'base64:...',
      left_photo_url: 'base64...',
      non_scale_victories: ['anti-inflammation', 'more energy'],
    };

    const plan = {
      user_id: user.id,
      type: 'weight_loss' as PlanType,
      eating_info: eating_info,
      health_info: health_info,
      goal_info: goal_info,
    };
    const result = await service.create(plan);

    expect(result).toMatchObject({
      status: 'successfully created',
    });
  });
});
