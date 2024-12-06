import { NestFactory } from '@nestjs/core';
import { FactoryModule } from './factory.module';

async function bootstrap() {
  const app = await NestFactory.create(FactoryModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
