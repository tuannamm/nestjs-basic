import { CommandBus } from '@nestjs/cqrs';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { LoginCommand } from '../application/login.command';
import { LocalAuthGuard } from '../guard/local-auth.guard';

import { Public } from 'libs/decorators/public/public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() request) {
    const command = new LoginCommand(request.user);
    return this.commandBus.execute(command);
  }

  @Get('/profile')
  getProfile(@Request() request) {
    return request.user;
  }
}
