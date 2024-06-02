import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PrintLog } from 'libs/decorators/print-log/print-log.decorator';
import { AuthService } from 'apps/auth/auth.service';
import { GetUserProfileLoginCommand } from '../get-user-profile.command';

@CommandHandler(GetUserProfileLoginCommand)
export class GetUserProfileHandler implements ICommandHandler<GetUserProfileLoginCommand> {
  constructor(private readonly authService: AuthService) {}

  @PrintLog
  async execute(command: GetUserProfileLoginCommand) {
    const { user } = command;

    return this.authService.login(user);
  }
}
