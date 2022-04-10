import { Injectable } from '@nestjs/common';
import amqp, { Channel } from 'amqp-connection-manager';
import * as debug from 'debug';

const NAME = 'Publish';
const EXCHANGE_KEY = 'emailExchangeKey';
const ROUTING_KEY = 'emailExchangeKey.emailRoutingKey';

@Injectable()
export class PublishService {
  private logger: debug.Debugger;

  async execute(): Promise<(msg: string) => void> {
    this.logger = debug('dev');
    return this.createMQPublisher();
  }

  createMQPublisher = () => {
    const conn = amqp.connect(process.env.AMQP_URL);

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

    const channelWrapper = conn.createChannel({
      json: true,
      setup: function (channel: Channel) {
        return channel.assertExchange(EXCHANGE_KEY, 'topic', {
          durable: false,
        });
      },
    });

    return (msg: string) => {
      console.log('Publishing message to RabbitMQ...', JSON.stringify(msg));
      channelWrapper.publish(EXCHANGE_KEY, ROUTING_KEY, msg);
    };
  };
}
