import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './repositories/user.repository';
import { UserSchema } from './schemas/user.schema';
import { PublishService } from './services/publish.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONN_STRING),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, UserRepository, UserService, PublishService],
})
export class AppModule {}
