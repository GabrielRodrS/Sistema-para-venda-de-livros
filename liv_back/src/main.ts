import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const frontendUrl =
    config.get<string>('FRONTEND_URL') || 'http://localhost:3001';

  app.enableCors({
    origin: frontendUrl,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Backend rodando na porta ${port}`);
}
bootstrap();
