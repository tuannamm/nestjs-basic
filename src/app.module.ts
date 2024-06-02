import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

import { UserModule } from 'apps/users/user.module';
import { AuthModule } from '../apps/auth/auth.module';
import { CompanyModule } from '../apps/company/company.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB_URI'),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          return connection;
        }
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: []
    }),
    JwtModule,
    UserModule,
    AuthModule,
    CompanyModule
  ]
})
export class AppModule {}
