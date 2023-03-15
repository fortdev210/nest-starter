import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsString,
  IsInt,
  IsIn,
  ValidateNested,
} from 'class-validator';
import { HealthRate } from '@prisma/client';

export class ExerciseMetaDto {
  @IsString()
  period: string;

  @IsString()
  time: string;

  @IsArray()
  @IsString({ each: true })
  type: string[];
}

export class HealthInfoDto {
  @ApiProperty()
  @IsIn(['excellent', 'good', 'fair', 'poor'])
  general_rate: HealthRate;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  chronic_condition: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  supplements_using: string[];

  @ApiProperty()
  @ValidateNested()
  @Type(() => ExerciseMetaDto)
  exercise: string;

  @ApiProperty()
  @IsInt()
  number_of_glasses_daily_water: number;
}
