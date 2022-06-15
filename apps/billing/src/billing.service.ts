import { Injectable } from '@nestjs/common';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

@Injectable()
export class BillingService {
  constructor(
    @InjectPinoLogger(BillingService.name) private readonly logger: PinoLogger,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  bill(data: any) {
    this.logger.info(data);
  }
}
