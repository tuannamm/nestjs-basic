import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { UpdatePermissionCommand } from '../update-permission.command';
import { PermissionEntity } from 'apps/permissions/domain/entities/permission.entity';

@CommandHandler(UpdatePermissionCommand)
export class UpdatePermissionHandler implements ICommandHandler<UpdatePermissionCommand> {
  constructor(
    @InjectModel(PermissionEntity.name)
    private readonly permissionModel: Model<PermissionEntity>
  ) {}

  async execute(command: UpdatePermissionCommand) {
    const { id, name, apiPath, module, method, user } = command;
    const { _id, email } = user;

    const result = await this.permissionModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        apiPath,
        method,
        module,
        name,
        updatedBy: {
          _id,
          email
        }
      }
    );

    return result;
  }
}
