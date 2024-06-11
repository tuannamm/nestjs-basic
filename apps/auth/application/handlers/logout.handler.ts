import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LogoutCommand } from '../logout.command';
import { AuthService } from 'apps/auth/auth.service';

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: LogoutCommand) {
    const { response, user } = command;

    response.clearCookie('refresh_token');

    await this.authService.logout(user);

    return 'Oke';
  }
}
