import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: false,
    //bufferLogs: true,
  });
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
