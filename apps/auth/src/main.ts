import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { AuthModule } from './auth.module';
import { RmqOptions } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { description, name, version } from '../package.json';
import { DEFAULT_TAG, SWAGGER_API_ROOT } from './constant/document';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH', true));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addTag(DEFAULT_TAG)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);

  const serviceURL = 'http://localhost:3001';
  const openApiURL = `${serviceURL}/${SWAGGER_API_ROOT}`;

  await app.listen(configService.get('PORT'));

  Logger.log(`🔵 swagger listening at ${openApiURL}`);
  Logger.log(`🔵 service listening at ${serviceURL}`);
}
bootstrap();
