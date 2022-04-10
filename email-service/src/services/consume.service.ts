import { Injectable } from '@nestjs/common';
import amqp, { Channel } from 'amqp-connection-manager';
import * as amqplib from 'amqplib';
import * as debug from 'debug';
import { EmailService } from './email.service';

const NAME = 'Consumer';
const QUEUE = `${process.env.QUEUE_NAME}_worker`;
const EXCHANGE_KEY = 'emailExchangeKey';
const ROUTING_KEY = 'emailExchangeKey.emailRoutingKey';

@Injectable()
export class ConsumeService {
  private logger: debug.Debugger;

  constructor(private readonly emailService: EmailService) {}

  public execute() {
    this.logger = debug('dev');

    const conn = amqp.connect([process.env.AMQP_URL]);

    conn.createChannel({
      json: true,
      setup: (channel: Channel) =>
        Promise.all([
          channel.assertQueue(QUEUE, {
            durable: true,
            autoDelete: true,
            messageTtl: 1800000,
          }),
          channel.bindQueue(QUEUE, EXCHANGE_KEY, ROUTING_KEY),
          channel.consume(
            QUEUE,
            (message: amqplib.Message) => {
              this.handleMessage(channel, message).catch(
                (err: Error | string) => {
                  this.logger(`[${NAME}] Error: ${err}`);
                },
              );
            },
            { noAck: false },
          ),
        ])
    });

    conn.on('connect', () => {
      this.logger(
        `[${NAME}] connected to RabbitMQ - waiting for published events`,
      );
    });

    conn.on('disconnect', (err) => {
      this.logger(
        `[${NAME}] disconnected from RabbitMQ ${JSON.stringify(err)}`,
      );
    });
  }

  private async handleMessage(
    channel: amqplib.Channel,
    message: amqplib.Message,
  ) {
    const { content } = message;
    const json = JSON.parse(JSON.parse(content.toString()));
    channel.ack(message);

    const { action } = json;

    switch (action) {
      case 'CREATE':
        // email service will send email
        this.emailService.send({
          from: process.env.EMAIL_ID,
          to: action.email,
          subject: 'Created Your account',
          body: 'Test Body',
          html: '<b>Test Body</b>',
        }, () => console.log('Email Sent'));
        break;
      default:
        this.logger(`[${NAME}] Unexpected action "${action}" - ignoring`);
        break;
    }
  }
}
