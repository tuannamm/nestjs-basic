import { CommandBus } from '@nestjs/cqrs';
import { Controller, Get, Post, Request, UseGuards, Body, Res } from '@nestjs/common';
import { Response } from 'express';

import { LoginCommand } from '../application/login.command';
import { RegisterCommand } from '../application/register.command';
import { GetNewAccessTokenCommand } from '../application/get-new-access-token.command';

import { LocalAuthGuard } from '../guard/local-auth.guard';

import { Public } from 'libs/decorators/public.decorator';
import { ResponseMessage } from 'libs/decorators/response-message.decorator';
import { RegisterDTO } from './dto/register.dto';
import { User } from 'libs/decorators/user.decorator';
import { LogoutCommand } from '../application/logout.command';
import { GetUserInformationCommand } from '../application/get-user-information.command';
import { PrintLog } from 'libs/decorators/print-log.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('register')
  @PrintLog
  @ResponseMessage('Register a new user')
  async createUser(@Body() register: RegisterDTO) {
    const { name, age, email, password, address, gender } = register;
    const command = new RegisterCommand(name, age, email, password, address, gender);
    return this.commandBus.execute(command);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @PrintLog
  @ResponseMessage('User login')
  @ResponseMessage('Login successfully')
  async login(@Res({ passthrough: true }) response: Response, @User() user) {
    const command = new LoginCommand(user, response);
    return this.commandBus.execute(command);
  }

  @Get('/account')
  @PrintLog
  @ResponseMessage('Get user information')
  async getAccount(@User() user) {
    const command = new GetUserInformationCommand(user);
    return this.commandBus.execute(command);
  }

  @Public()
  @Get('/refresh')
  @PrintLog
  @ResponseMessage('Get user by refresh token')
  async refreshToken(@Request() request, @Res({ passthrough: true }) response: Response) {
    const refreshToken = request.cookies['refresh_token'];
    const command = new GetNewAccessTokenCommand(refreshToken, response);
    return this.commandBus.execute(command);
  }

  @Post('/logout')
  @PrintLog
  @ResponseMessage('Logout successfully')
  async logout(@Res({ passthrough: true }) response: Response, @User() user) {
    const command = new LogoutCommand(response, user);
    return this.commandBus.execute(command);
  }
}
