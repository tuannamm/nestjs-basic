import { request } from 'http';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { UserDocument, UserEntity } from 'apps/users/domain/entities/user.entities';

import { PrintLog } from 'libs/decorators/print-log.decorator';
import { CanNotDeleteUser } from 'apps/users/user.exception';

import { DeleteUserCommand } from '../delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: SoftDeleteModel<UserDocument>
  ) {}

  async execute(command: DeleteUserCommand) {
    const { id, request } = command;
    const user = request.user;

    const result = await this.userModel.softDelete({
      _id: id
    });

    if (!result) throw new CanNotDeleteUser();

    return {
      ...result,
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    };
  }
}
