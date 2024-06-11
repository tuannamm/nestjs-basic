import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { GetNewAccessTokenCommand } from '../get-new-access-token.command';
import { AuthService } from 'apps/auth/auth.service';

@CommandHandler(GetNewAccessTokenCommand)
export class GetNewAccessTokenHandler implements ICommandHandler<GetNewAccessTokenCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: GetNewAccessTokenCommand) {
    const { refreshToken, response } = command;

    return this.authService.getNewAccessToken(refreshToken, response);
  }
}
