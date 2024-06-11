import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UpdateUserCommand } from '../update-user.command';
import { CanNotUpdateUser, MissingId } from 'apps/users/user.exception';
import { UserEntity } from 'apps/users/domain/entities/user.entities';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>
  ) {}

  async execute(command: UpdateUserCommand) {
    const { id, name, address, age, email, phone, role, gender, company, request } = command;
    const user = request.user;

    if (!id) throw new MissingId();

    const result = await this.userModel.findByIdAndUpdate(id, {
      name,
      address,
      age,
      email,
      phone,
      role,
      gender,
      company,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    });

    if (!result) throw new CanNotUpdateUser();

    return result;
  }
}
