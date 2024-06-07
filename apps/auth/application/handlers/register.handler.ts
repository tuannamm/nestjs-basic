import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RegisterCommand } from '../register.command';
import { CommonUtils } from 'libs/utils/utils.common';
import { UserService } from 'apps/users/user.service';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(private readonly commonFunction: CommonUtils, private readonly userService: UserService) {}

  async execute(command: RegisterCommand) {
    const { email, password, name, age, gender, address } = command;

    const hashedPassword = this.commonFunction.hashPassword(password);

    return this.userService.registerUser({ email, password: hashedPassword, name, age, gender, address });
  }
}
