import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePermissionCommand } from '../create-permission.command';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { PermissionEntity } from 'apps/permissions/domain/entities/permission.entity';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler implements ICommandHandler<CreatePermissionCommand> {
  constructor(
    @InjectModel(PermissionEntity.name)
    private readonly permissionModel: Model<PermissionEntity>
  ) {}

  async execute(command: CreatePermissionCommand) {
    const { name, apiPath, module, method, user } = command;
    const { _id, email } = user;

    const isExisted = await this.permissionModel.findOne({ apiPath, method });

    if (isExisted) return `Api path ${apiPath} with method ${method} is existed`;

    const result = await this.permissionModel.create({
      name,
      apiPath,
      module,
      method,
      createdBy: {
        _id,
        email
      }
    });

    return {
      _id: result._id,
      createdAt: result.createdAt
    };
  }
}
