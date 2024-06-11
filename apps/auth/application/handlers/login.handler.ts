import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LoginCommand } from '../login.command';
import { AuthService } from 'apps/auth/auth.service';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: LoginCommand) {
    const { user, response } = command;

    const result = await this.authService.login(user);

    response.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    return result;
  }
}
