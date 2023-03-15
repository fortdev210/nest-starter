import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, IsIn } from 'class-validator';

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
  @IsIn([
    'dairy',
    'shellfish',
    'gluten',
    'beef',
    'chicken',
    'pork',
    'nuts',
    'eggs',
    'soy',
  ])
  allergy_food: string[];

  @ApiProperty()
  @IsString()
  type: string;
}
