import { NestFactory } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConsumeService } from './services/consume.service';
import { worker } from './worker';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  if (process.argv[2] === 'worker' || process.env.NODE_ENV === 'development') {
    // app.connectMicroservice(worker as RmqOptions);
    // await app.startAllMicroservices();
    app.get(ConsumeService).execute();
  }

  await app.listen(process.env.PORT || 3000).then(() => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}

bootstrap();
