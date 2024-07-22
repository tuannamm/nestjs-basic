import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './presentation/auth.controller';

import { CommonUtils } from 'libs/utils/utils.common';

import { UserModule } from 'apps/users/user.module';

import { LocalStrategy } from './strategy/local-strategy';
import { JwtStrategy } from './strategy/jwt-strategy';

import { AuthService } from './auth.service';
import { IsEmailUserAlreadyExistConstraint } from 'apps/users/validate-email';

import { GetUserProfileHandler } from './application/handlers/get-user-profile.handler';
import { GetNewAccessTokenHandler } from './application/handlers/get-new-access-token.handler';
import { LogoutHandler } from './application/handlers/logout.handler';
import { LoginHandler } from './application/handlers/login.handler';
import { RegisterHandler } from './application/handlers/register.handler';
import { GetUserInformationHandler } from './application/handlers/get-user-information.handler';

const handler = [
  GetUserProfileHandler,
  LoginHandler,
  RegisterHandler,
  GetNewAccessTokenHandler,
  LogoutHandler,
  GetUserInformationHandler
];

@Module({
  imports: [
    CqrsModule,
    UserModule,
    PassportModule,
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
  controllers: [AuthController],
  providers: [
    ...handler,
    CommonUtils,
    LocalStrategy,
    AuthService,
    JwtService,
    JwtStrategy,
    IsEmailUserAlreadyExistConstraint
  ],
  exports: [LoginHandler, AuthService, JwtStrategy]
})
export class AuthModule {}
