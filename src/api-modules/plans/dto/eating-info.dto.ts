import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, IsUUID } from 'class-validator';

export class EatingInfoDto {
  @ApiProperty()
  @IsString()
  cooking_skill: string;

  @ApiProperty()
  @IsNumber()
  plan_feed_number: number;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  allergy_food: string[];

  @ApiProperty()
  @IsString()
  type: string;
}
