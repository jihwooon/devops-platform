import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * 애플리케이션을 위한 Swagger 문서를 설정합니다.
 *
 * @param app - INestApplication 인스턴스입니다.
 */
export const setupSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('DevOps-Platform')
    .setDescription('DevOpsPlatform API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
};
