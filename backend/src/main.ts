import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS para comunicação com frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // URLs do seu frontend
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // Configurar validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Prefixo global para todas as rotas
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 Aplicação rodando na porta ${port}`);
  console.log(`📝 API disponível em: http://localhost:${port}/api`);
}
bootstrap();
