import { RoleEntity, RoleSchema } from './domain/entities/role.entity';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { RoleController } from './presentation/roles.controller';

import { GetPermissionByIdHandler } from './application/queries/handlers/get-role-by-id.handler';
import { DeleteRoleHandler } from './application/commands/handlers/delete-role.handler';
import { CreateRoleHandler } from './application/commands/handlers/create-role.handler';
import { UpdateRoleHandler } from './application/commands/handlers/update-role.handler';
import { GetListRoleQueryHandler } from './application/queries/handlers/get-list-role.handler';

const handlers = [
  CreateRoleHandler,
  UpdateRoleHandler,
  GetListRoleQueryHandler,
  GetPermissionByIdHandler,
  DeleteRoleHandler
];

const repositories = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_DB_URI')
    }),
    inject: [ConfigService]
  }),
  MongooseModule.forFeature([{ name: RoleEntity.name, schema: RoleSchema }])
];

@Module({
  imports: [CqrsModule, ...repositories],
  controllers: [RoleController],
  providers: [...handlers]
})
export class RolesModule {}
