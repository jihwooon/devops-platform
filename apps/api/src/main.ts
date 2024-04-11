import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS_ALLOW_ORIGIN, PORT } from './config/settings';
import { setupSwagger } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: CORS_ALLOW_ORIGIN,
  });

  setupSwagger(app);

  await app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
bootstrap();
