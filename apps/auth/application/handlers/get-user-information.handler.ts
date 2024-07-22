import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetUserInformationCommand } from '../get-user-information.command';
import { InjectModel } from '@nestjs/mongoose';
import { RoleEntity } from 'apps/roles/domain/entities/role.entity';
import { Model } from 'mongoose';

@CommandHandler(GetUserInformationCommand)
export class GetUserInformationHandler implements ICommandHandler<GetUserInformationCommand> {
  constructor(
    @InjectModel(RoleEntity.name)
    private readonly roleModel: Model<RoleEntity>
  ) {}

  async execute(command: GetUserInformationCommand) {
    const { user } = command;

    const userPermissions = await this.roleModel.find({ _id: user.role._id }).populate({
      path: 'permissions',
      select: { _id: 1, name: 1, apiPath: 1, method: 1, module: 1 }
    });

    user.permissions = userPermissions[0].permissions;

    return { user };
  }
}
