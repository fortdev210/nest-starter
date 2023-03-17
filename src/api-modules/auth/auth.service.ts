import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    // private userService: UserService
    private configService: ConfigService,
  ) {}

  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, this.configService.get('bcrypt.salt'))
  }
}
