import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabasesService } from './databases.service';
import { DatabasesController } from './databases.controller';
import { UserEntity, UserSchema } from 'apps/users/domain/entities/user.entities';
import { PermissionEntity, PermissionSchema } from 'apps/permissions/domain/entities/permission.entity';
import { RoleEntity, RoleSchema } from 'apps/roles/domain/entities/role.entity';
import { CommonUtils } from 'libs/utils/utils.common';

@Module({
  controllers: [DatabasesController],
  providers: [DatabasesService, CommonUtils],
  imports: [
    MongooseModule.forFeature([
      { name: UserEntity.name, schema: UserSchema },
      { name: PermissionEntity.name, schema: PermissionSchema },
      { name: RoleEntity.name, schema: RoleSchema }
    ])
  ]
})
export class DatabasesModule {}
