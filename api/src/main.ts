import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  LoggingInterceptor,
  TransformResponseInterceptor,
} from './modules/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
    //bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.useGlobalInterceptors(
    new TransformResponseInterceptor(),
    new LoggingInterceptor(),
  );
  await app.listen(process.env.PORT || 3008);
}
bootstrap();
