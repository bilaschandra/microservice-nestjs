import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EmailService } from './services/email.service';

@Controller()
export class AppController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  getHello(): string {
    return 'Helo World!!!';
  }

  @EventPattern('send_email')
  sendEmail(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log(`Pattern: ${context.getMessage()}`, data);
  }
}
