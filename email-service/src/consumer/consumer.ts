import amqp, { Channel } from 'amqp-connection-manager';

const createMQConsumer = () => {
  console.log('createMQConsumer Connecting to RabbitMQ...');
  const EXCHANGE_KEY = 'emailExchangeKey';
  const ROUTING_KEY = 'emailExchangeKey.emailRoutingKey';
  const QUEUE = `${process.env.QUEUE_NAME}_worker`;

  const connection = amqp.connect(process.env.AMQP_URL);

  const channelWrapper = connection.createChannel({
    json: true,
    setup: (channel) => Promise.all([
        channel.assertQueue(QUEUE, {
            durable: true,
            autoDelete: true,
            messageTtl: 1800000,
        }),
        channel.assertExchange(EXCHANGE_KEY, 'topic', { durable: true }),
        // channel.prefetch(1),
        channel.bindQueue(QUEUE, EXCHANGE_KEY, ROUTING_KEY),
    ])
  });

  return (msg: string) => {
    console.log('Publishing message to RabbitMQ...', JSON.stringify(msg));
    channelWrapper.consume(QUEUE, (m) => console.log(m));
  };
};

export default createMQConsumer;
