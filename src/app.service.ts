import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health() {
    return {
      message: 'api is working',
    };
  }
}
