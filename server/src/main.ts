import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { configService } from './config/config.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Land Directory API')
        .setDescription('My Land Directory  API')
        .setVersion('v1.0')
        .build(),
    );
    SwaggerModule.setup('/', app, document);
  }
  await app.listen(3000);
}
bootstrap();
