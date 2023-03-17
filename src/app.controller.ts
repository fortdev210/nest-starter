import { Controller, Get, Version } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Version('1')
  @Get('/health')
  healthCheck() {
    return this.appService.health();
  }
}
