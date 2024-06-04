import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../update-user.command';
import { PrintLog } from 'libs/decorators/print-log.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from 'apps/users/domain/entities/user.entities';
import { Model } from 'mongoose';
import { CanNotUpdateUser, MissingId } from 'apps/users/user.exception';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>
  ) {}

  @PrintLog
  async execute(command: UpdateUserCommand) {
    const { id, name, address, age, email, phone } = command;

    if (!id) throw new MissingId();

    const result = await this.userModel.findByIdAndUpdate(id, {
      name,
      address,
      age,
      email,
      phone
    });

    if (!result) throw new CanNotUpdateUser();
  }
}
