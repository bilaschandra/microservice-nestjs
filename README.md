# microservice-nestjs-rabbitmq (event driven microservice to microservice communication)
Scaffold quickly your next [NestJS 8](https://nestjs.com/) API project with 
- NestJS
- RabbitMQ
- MongoDB
- Docker (docker-compose)
- JWT
- Nodemailer

# Auth service (NestJS, RabbitMQ, MongoDB, Docker compose)
- [auth-service](https://github.com/bilaschandra/microservice-nestjs/auth-service) is a service to create a new user registration, login, token etc. We are using JWT to hangle the token. This service will publish a message (rabbit event) after registering a new user. To publish the event, here is using `Topic` type, `Exchange` key and `Routing` key. So that, the consumer should consume the event/message with the exchange key with the routing key.
- This is also a publisher service. Publishing message to the RabbitMQ channel (topic/direct/fanout).

# Email service (NestJS, RabbitMQ, Docker compose)
- [email-service](https://github.com/bilaschandra/microservice-nestjs/email-service) is a kind of worker who is responsible for sending email after registering each user. We are using same technologies what we used for auth-service. 
- This is also a consumer service. Consuming message from the RabbitMQ queue and processing it.

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/) and NPM
- A database such as MariaDB, MySQL, PostgreSQL or MongoDB. You may use the provided `docker-compose` file. Here we have used [MongoDB](https://www.mongodb.com/)
- [RabbitMQ](https://www.rabbitmq.com/) is an open-source and lightweight message broker which supports multiple messaging protocols. It can be deployed in distributed and federated configurations to meet high-scale, high-availability requirements. In addition, it's the most widely deployed message broker, used worldwide at small startups and large enterprises.
- [Docker compose](https://docs.docker.com/compose/) may also be useful for advanced testing and image building, although it is not required for development.

### 1.2 Project configuration

Start by cloning this project on your workstation.

``` sh
git clone https://github.com/bilaschandra/microservice-nestjs microservice-nestjs
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./microservice-nestjs/auth-service
npm install
```


```sh
cd ./microservice-nestjs/email-service
npm install
```

Once the dependencies are installed, you can now configure your project by creating a new `.env` file containing your environment variables used for development.

```
vi .env
```

## 1.3. Default NPM commands (We recommended to use docker)

The NPM commands below are already included with this template and can be used to quickly run, build and test your project.
Go to the `auth-service` folder and run the bellow commands. Same way you can run the `email-service` microservice.

```sh
# Start the application using the transpiled NodeJS
npm run start:dev or docker-compose up 

# Transpile the TypeScript files
npm run build

# Internal command used during the Docker build stage
docker-compose up

# Run the project' functional tests
npm run test

# Lint the project files using TSLint
npm run lint


## 1.4. Project goals

The goal of this project is to provide a clean and up-to-date "starter pack" for REST API projects that are built with NestJS. As a advanced start up, we might clone and quick start for Pub/Sub or event based microservice communication.

## 1.5. Contributing

Feel free to suggest an improvement, report a bug, or ask something: [https://github.com/bilaschandra/microservice-nestjs/issues](https://github.com/bilaschandra/microservice-nestjs/issues)
