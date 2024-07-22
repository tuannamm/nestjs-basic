import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';

import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { DeleteRoleCommand } from '../delete-role.command';
import { RoleDocument, RoleEntity } from 'apps/roles/domain/entities/role.entity';
import { ADMIN_ROLE } from 'apps/databases/sample';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  constructor(
    @InjectModel(RoleEntity.name)
    private readonly roleModel: SoftDeleteModel<RoleDocument>
  ) {}

  async execute(command: DeleteRoleCommand) {
    const { id, user } = command;
    const { _id, email } = user;

    const isAdminRole = await this.roleModel.findOne({ _id: id, name: ADMIN_ROLE });
    if (isAdminRole) throw new Error('Can not delete admin role');

    const result = await this.roleModel.softDelete({
      _id: id
    });

    return {
      ...result,
      deletedBy: {
        _id,
        email
      }
    };
  }
}
