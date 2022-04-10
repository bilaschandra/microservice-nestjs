import {
    RmqOptions,
    TcpClientOptions,
    Transport,
  } from '@nestjs/microservices';
  
  export const worker: RmqOptions | TcpClientOptions = process.env.NODE_ENV === 'test'
    ? {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: Number(process.env.PORT || 6061),
      },
    }
    : {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL as string],
        queue: `${process.env.QUEUE_NAME}_worker`,
        prefetchCount: 5,
        queueOptions: {
          durable: true,
          autoDelete: true,
          messageTtl: 1800000,
        },
      },
    };
  