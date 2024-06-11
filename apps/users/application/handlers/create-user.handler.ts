import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserCommand } from '../create-user.command';
import { UserEntity } from 'apps/users/domain/entities/user.entities';
import { CanNotCreateUser, MissingEmail, MissingPassword } from 'apps/users/user.exception';
import { CommonUtils } from 'libs/utils/utils.common';
import { PrintLog } from 'libs/decorators/print-log.decorator';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
    private readonly commonFunction: CommonUtils
  ) {}

  @PrintLog
  async execute(command: CreateUserCommand) {
    const { name, age, email, password, address, gender, role, company, user } = command;

    if (!email) throw new MissingEmail();
    if (!password) throw new MissingPassword();

    const hashedPassword = this.commonFunction.hashPassword(password);

    const result = await this.userModel.create({
      name,
      age,
      email,
      password: hashedPassword,
      address,
      gender,
      role: role ?? 'USER',
      company,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });

    if (!result) throw new CanNotCreateUser();

    return {
      _id: result._id,
      createdAt: result.createdAt
    };
  }
}
