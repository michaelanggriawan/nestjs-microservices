import './tracing';
import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { BillingModule } from './billing.module';
import { Logger as PinoLogger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.useLogger(app.get(PinoLogger));
  app.connectMicroservice(rmqService.getOptions('BILLING'));
  await app.startAllMicroservices();
}
bootstrap();
