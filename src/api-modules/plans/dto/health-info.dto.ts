import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

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
  @IsString()
  general_rate: string;

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
  exercise: ExerciseMetaDto;
}
