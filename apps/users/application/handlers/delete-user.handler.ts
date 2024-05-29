import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../delete-user.command';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from 'apps/users/domain/entities/user.entities';
import { Model } from 'mongoose';
import { PrintLog } from 'libs/print-log/print-log.decorator';
import { CanNotDeleteUser } from 'apps/users/user.exception';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>
  ) {}

  @PrintLog
  async execute(command: DeleteUserCommand) {
    const { id } = command;

    const deleted = await this.userModel.findByIdAndDelete(id);

    if (!deleted) throw new CanNotDeleteUser();
  }
}
