import { Body, ConflictException, Controller, HttpCode, Post, Version } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LogInUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'Logged in user and access token',
    type: LogInUserDto,
  })
  @HttpCode(200)
  @Post('/login')
  @Version('1')
  login(@Body() user: LogInUserDto) {
    return this.authService.login(user);
  }

  @Version('1')
  @ApiResponse({
    status: 201,
    description: 'Register user',
    type: RegisterUserDto,
  })
  @Post('/register')
  async register(@Body() userData: RegisterUserDto) {
    const checkEmail = await this.authService.validateEmail({
      email: userData.email,
    });
    if (checkEmail.exist) {
      throw new ConflictException('User with that email already exists');
    }

    const user = await this.authService.registerUser(userData);
    return { user };
  }
}
