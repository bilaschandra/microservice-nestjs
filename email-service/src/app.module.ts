import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { ConsumeService } from './services/consume.service';
import { EmailService } from './services/email.service';
import { worker } from './worker';

@Module({
  imports: [ClientsModule.register([{ name: 'EVENTS', ...worker }])],
  controllers: [AppController],
  providers: [ConsumeService, EmailService],
})
export class AppModule {}
