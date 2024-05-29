import { Module } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserController } from './presentation/user.controller';
import { UserEntity, UserSchema } from './domain/entities/user.entities';
import { CommonUtils } from 'libs/utils/utils.common';

import { CreateUserHandler } from './application/handlers/create-user.handler';
import { FindUserByIdHandler } from './application/queries/find-user-by-id.query';
import { UpdateUserHandler } from './application/handlers/update-user.handler';
import { DeleteUserHandler } from './application/handlers/delete-user.handler';

const handlers = [FindUserByIdHandler, CreateUserHandler, UpdateUserHandler, DeleteUserHandler];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB_URI')
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [...handlers, CommonUtils],
  exports: [...handlers]
})
export class UserModule {}
