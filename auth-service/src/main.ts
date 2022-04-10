import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PublishService } from './services/publish.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.get(PublishService).execute();

  await app.listen(process.env.PORT || 3000).then(() => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}

bootstrap();
