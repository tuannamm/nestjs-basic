import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LoginCommand } from '../login.command';

import { PrintLog } from 'libs/decorators/print-log.decorator';
import { AuthService } from 'apps/auth/auth.service';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(private readonly authService: AuthService) {}

  @PrintLog
  async execute(command: LoginCommand) {
    const { user } = command;

    const result = await this.authService.login(user);

    return result;
  }
}
