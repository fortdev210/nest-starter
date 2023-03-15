import { Test, TestingModule } from '@nestjs/testing';
import { PlansService } from './plans.service';
import { PrismaService } from '../../prisma/prisma.service';

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
});
