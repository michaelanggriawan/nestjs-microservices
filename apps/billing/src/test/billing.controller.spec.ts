import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { BillingController } from '../billing.controller';
import { BillingService } from '../billing.service';
import { RmqModule, AuthModule } from '@app/common';
import * as Joi from 'joi';

describe('BillingController', () => {
  let billingController: BillingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: Joi.object({
            RABBIT_MQ_URI: Joi.string().required(),
            RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
          }),
          envFilePath: './apps/billing/.env',
        }),
        RmqModule,
        AuthModule,
      ],
      controllers: [BillingController],
      providers: [BillingService],
    }).compile();

    billingController = app.get<BillingController>(BillingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(billingController.getHello()).toBe('Hello World!');
    });
  });
});
