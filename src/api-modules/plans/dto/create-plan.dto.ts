import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PlanType } from '@prisma/client';
import { GoalInfoDto } from './goal-info.dto';
import { HealthInfoDto } from './health-info.dto';
import { EatingInfoDto } from './eating-info.dto';

export class CreatePlanDto {
  @ApiProperty()
  @IsIn(['weight_loss', 'feel_better'])
  type: PlanType;

  @ApiProperty()
  @ValidateNested()
  @Type(() => EatingInfoDto)
  eating_info: EatingInfoDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => HealthInfoDto)
  health_info: HealthInfoDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => GoalInfoDto)
  goal_info: GoalInfoDto;
}
