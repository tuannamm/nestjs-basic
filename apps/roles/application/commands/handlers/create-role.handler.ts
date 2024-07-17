import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRoleCommand } from '../create-role.command';
import { RoleEntity } from 'apps/roles/domain/entities/role.entity';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(
    @InjectModel(RoleEntity.name)
    private readonly roleModel: Model<RoleEntity>
  ) {}

  async execute(command: CreateRoleCommand) {
    const { name, description, isActive, permissions, user } = command;
    const { _id, email } = user;

    const isExisted = await this.roleModel.findOne({ name });

    if (isExisted) return `Role ${name} is existed`;

    const result = await this.roleModel.create({
      name,
      description,
      permissions,
      isActive,
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
