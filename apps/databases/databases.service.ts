import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { UserDocument, UserEntity } from 'apps/users/domain/entities/user.entities';
import { RoleDocument, RoleEntity } from 'apps/roles/domain/entities/role.entity';
import { PermissionEntity } from 'apps/permissions/domain/entities/permission.entity';
import { CommonUtils } from 'libs/utils/utils.common';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sample';
import { PrintLog } from 'libs/decorators/print-log.decorator';

@Injectable()
export class DatabasesService implements OnModuleInit {
  private readonly logger = new Logger(DatabasesService.name);

  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(RoleEntity.name)
    private readonly roleModel: SoftDeleteModel<RoleDocument>,
    @InjectModel(PermissionEntity.name)
    private readonly permissionModel: SoftDeleteModel<UserDocument>,
    private readonly configService: ConfigService,
    private readonly commonUtils: CommonUtils
  ) {}

  @PrintLog
  async onModuleInit() {
    const isInit = this.configService.get<string>('SHOULD_INIT');
    if (!Boolean(isInit)) return;
    const countUser = await this.userModel.count({});
    const countPermission = await this.permissionModel.count({});
    const countRole = await this.roleModel.count({});

    if (countPermission === 0) {
      await this.permissionModel.insertMany(INIT_PERMISSIONS);
    }

    if (countRole === 0) {
      const permissions = await this.permissionModel.find({}).select('_id');
      await this.roleModel.insertMany([
        {
          name: ADMIN_ROLE,
          description: 'Admin',
          isActive: true,
          permissions
        },
        {
          name: USER_ROLE,
          description: 'Người dùng/Ứng viên sử dụng hệ thống',
          isActive: true,
          permissions: []
        }
      ]);
    }

    if (countUser === 0) {
      const adminRole = await this.roleModel.findOne({ name: ADMIN_ROLE });
      const userRole = await this.roleModel.findOne({ name: USER_ROLE });
      await this.userModel.insertMany([
        {
          name: "I'm admin",
          email: 'admin@gmail.com',
          password: this.commonUtils.hashPassword(this.configService.get<string>('INIT_PASSWORD')),
          age: 69,
          gender: 'MALE',
          address: 'VietNam',
          role: adminRole?._id
        },
        {
          name: 'Tuan Nam',
          email: 'nttnnam@gmail.com',
          password: this.commonUtils.hashPassword(this.configService.get<string>('INIT_PASSWORD')),
          age: 96,
          gender: 'MALE',
          address: 'VietNam',
          role: adminRole?._id
        },
        {
          name: "I'm normal user",
          email: 'user@gmail.com',
          password: this.commonUtils.hashPassword(this.configService.get<string>('INIT_PASSWORD')),
          age: 69,
          gender: 'MALE',
          address: 'VietNam',
          role: userRole?._id
        }
      ]);
    }

    if (countUser > 0 && countRole > 0 && countPermission > 0) {
      this.logger.log('>>> ALREADY INIT SAMPLE DATA...');
    }
  }
}
