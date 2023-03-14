import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, IsUUID, IsDate } from 'class-validator';

export class GoalInfoDto {
  @ApiProperty()
  @IsDate()
  dob: string;

  @ApiProperty()
  @IsDate()
  start_date: string;

  @ApiProperty()
  @IsNumber()
  upper_arm: number;

  @ApiProperty()
  @IsNumber()
  hips: number;

  @ApiProperty()
  @IsNumber()
  waist: number;

  @ApiProperty()
  @IsNumber()
  thigh: number;

  @ApiProperty()
  @IsNumber()
  height: number;

  @ApiProperty()
  @IsNumber()
  highest_weight: number;

  @ApiProperty()
  @IsNumber()
  goal_weight: number;

  @ApiProperty()
  @IsString()
  front_photo_url: string;

  @ApiProperty()
  @IsString()
  left_photo_url: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  non_scale_victories: string[];
}
