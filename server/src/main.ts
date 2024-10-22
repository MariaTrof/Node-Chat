import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

const logger = new Logger('AppBootstrap');
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Chat users')
    .setDescription('API description: запросы')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/doc', app, document);

  await app.listen(PORT, () => {
    logger.log(`Server started on port: ${PORT}`);
  });
}
bootstrap();
