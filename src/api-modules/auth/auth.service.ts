import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { LogInUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ValidateEmailDto } from './dto/validate-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private configService: ConfigService,
  ) {}

  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, this.configService.get('bcrypt.salt'));
  }

  async validateUser(data: LogInUserDto): Promise<User> {
    const user = await this.userService.findOne({ email: data.email });
    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      throw new BadRequestException('Invalid email or password');
    }
    delete user.password;
    return user;
  }

  async registerUser(data: RegisterUserDto): Promise<User> {
    data.password = this.hashPassword(data.password);
    const user = await this.userService.create(data);
    delete user.password;

    return user;
  }

  async login(
    userDto: LogInUserDto,
  ): Promise<{ accessToken: string; user: User }> {
    const user = await this.validateUser(userDto);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const { secret, expiresIn } = this.configService.get('jwt');

    return {
      accessToken: this.jwtService.sign({ id: user.id }, { secret, expiresIn }),
      user,
    };
  }

  async validateEmail(data: ValidateEmailDto): Promise<{ exist: boolean }> {
    const exist = !!(await this.userService.findOne({ email: data.email }));
    return { exist };
  }
}
