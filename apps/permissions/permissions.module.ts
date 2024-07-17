import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PermissionsController } from './presentation/permissions.controller';
import { PermissionEntity, PermissionSchema } from './domain/entities/permission.entity';
import { CreatePermissionHandler } from './application/commands/handlers/create-permission.handler';
import { UpdatePermissionHandler } from './application/commands/handlers/update-permission.handler';
import { GetListJobsQueryHandler } from './application/queries/handlers/get-list-permission.handler';
import { GetPermissionByIdHandler } from './application/queries/handlers/get-permission-by-id.handler';
import { DeletePermissionHandler } from './application/commands/handlers/delete-permission.handler';

const handlers = [
  CreatePermissionHandler,
  UpdatePermissionHandler,
  GetListJobsQueryHandler,
  GetPermissionByIdHandler,
  DeletePermissionHandler
];

const repositories = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_DB_URI')
    }),
    inject: [ConfigService]
  }),
  MongooseModule.forFeature([{ name: PermissionEntity.name, schema: PermissionSchema }])
];

@Module({
  imports: [CqrsModule, ...repositories],
  controllers: [PermissionsController],
  providers: [...handlers]
})
export class PermissionsModule {}
