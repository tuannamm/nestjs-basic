import { Module } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserController } from './presentation/user.controller';
import { UserEntity, UserSchema } from './domain/entities/user.entities';

import { CreateUserHandler } from './application/handlers/create-user.handler';
import { FindUserByIdHandler } from './application/queries/find-user-by-id.query';
import { UpdateUserHandler } from './application/handlers/update-user.handler';
import { DeleteUserHandler } from './application/handlers/delete-user.handler';
import { UserService } from './user.service';
import { CommonUtils } from 'libs/utils/utils.common';

import { JwtModule, JwtService } from '@nestjs/jwt';
import { IsEmailUserAlreadyExistConstraint } from './validate-email';
import { FindListUserHandler } from './application/queries/find-list-user.query';

const handlers = [FindUserByIdHandler, CreateUserHandler, UpdateUserHandler, DeleteUserHandler, FindListUserHandler];

const repositories = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_DB_URI')
    }),
    inject: [ConfigService]
  }),
  MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])
];

@Module({
  imports: [
    CqrsModule,
    ...repositories,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN')
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [UserController],
  providers: [...handlers, CommonUtils, UserService, JwtService, IsEmailUserAlreadyExistConstraint],
  exports: [...handlers, ...repositories, MongooseModule, UserService]
})
export class UserModule {}
