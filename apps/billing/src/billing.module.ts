import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { RmqModule, AuthModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { DatadogTraceModule } from 'nestjs-ddtrace';
import * as Joi from 'joi';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: { level: process.env.prod !== 'prod' ? 'trace' : 'info' },
    }),
    DatadogTraceModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule,
    AuthModule,
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
