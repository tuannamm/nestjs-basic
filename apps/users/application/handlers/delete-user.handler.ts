import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { UserDocument, UserEntity } from 'apps/users/domain/entities/user.entities';

import { PrintLog } from 'libs/decorators/print-log/print-log.decorator';
import { CanNotDeleteUser } from 'apps/users/user.exception';

import { DeleteUserCommand } from '../delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: SoftDeleteModel<UserDocument>
  ) {}

  @PrintLog
  async execute(command: DeleteUserCommand) {
    const { id } = command;

    const deleted = await this.userModel.softDelete({
      _id: id
    });

    if (!deleted) throw new CanNotDeleteUser();

    return deleted;
  }
}
