import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ValidateEmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => `${value}`.toLowerCase())
  email: string;
}
