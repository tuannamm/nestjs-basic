import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


import { UserModule } from 'apps/users/user.module';
import { AuthModule } from '../apps/auth/auth.module';
import { CompanyModule } from '../apps/company/company.module';
import { JobModule } from 'apps/job/job.module';
import { FilesModule } from '../apps/file/file.module';
import { ResumesModule } from '../apps/resumes/resumes.module';
import { RolesModule } from 'apps/roles/roles.module';
import { PermissionsModule } from 'apps/permissions/permissions.module';
import { DatabasesModule } from 'apps/databases/databases.module';


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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/images', // This will serve the files under the /images path
    }),
    JwtModule,
    UserModule,
    AuthModule,
    CompanyModule,
    JobModule,
    FilesModule,
    ResumesModule,
    PermissionsModule,
    RolesModule,
    DatabasesModule
  ]
})
export class AppModule {}
