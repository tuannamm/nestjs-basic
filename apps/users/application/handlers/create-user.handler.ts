import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserCommand } from '../create-user.command';
import { UserEntity } from 'apps/users/domain/entities/user.entities';
import { CanNotCreateUser, MissingEmail, MissingPassword } from 'apps/users/user.exception';
import { CommonUtils } from 'libs/utils/utils.common';
import { PrintLog } from 'libs/decorators/print-log/print-log.decorator';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
    private readonly commonFunction: CommonUtils
  ) {}

  @PrintLog
  async execute(command: CreateUserCommand) {
    const { name, age, email, password, phone, address } = command;

    if (!email) throw new MissingEmail();
    if (!password) throw new MissingPassword();

    const hashedPassword = this.commonFunction.hashPassword(password);

    const createUser = await this.userModel.create({
      name,
      age,
      email,
      password: hashedPassword,
      phone,
      address
    });

    if (!createUser) throw new CanNotCreateUser();

    return createUser;
  }
}
