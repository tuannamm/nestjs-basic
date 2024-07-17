import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';

import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { DeletePermissionCommand } from '../delete-permission.command';
import { PermissionDocument, PermissionEntity } from 'apps/permissions/domain/entities/permission.entity';

@CommandHandler(DeletePermissionCommand)
export class DeletePermissionHandler implements ICommandHandler<DeletePermissionCommand> {
  constructor(
    @InjectModel(PermissionEntity.name)
    private readonly permissionModel: SoftDeleteModel<PermissionDocument>
  ) {}

  async execute(command: DeletePermissionCommand) {
    const { id, user } = command;
    const { _id, email } = user;

    const result = await this.permissionModel.softDelete({
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
