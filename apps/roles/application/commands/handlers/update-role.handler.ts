import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { UpdateRoleCommand } from '../update-role.command';
import { RoleEntity } from 'apps/roles/domain/entities/role.entity';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(
    @InjectModel(RoleEntity.name)
    private readonly roleModel: Model<RoleEntity>
  ) {}

  async execute(command: UpdateRoleCommand) {
    const { id, name, description, isActive, permissions, user } = command;
    const { _id, email } = user;

    if (!mongoose.Types.ObjectId.isValid(id)) return `Role ${id} is invalid`;

    const result = await this.roleModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        description,
        isActive,
        permissions,
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
