import { CommandBus } from '@nestjs/cqrs';
import { Controller, Get, Post, Request, UseGuards, Body, Res } from '@nestjs/common';
import { Response } from 'express';

import { LoginCommand } from '../application/login.command';
import { RegisterCommand } from '../application/register.command';

import { LocalAuthGuard } from '../guard/local-auth.guard';

import { Public } from 'libs/decorators/public.decorator';
import { ResponseMessage } from 'libs/decorators/response-message.decorator';
import { RegisterDTO } from './dto/register.dto';
import { User } from 'libs/decorators/user.decorator';
import { GetNewAccessTokenCommand } from '../application/get-new-access-token.command';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Public()
  @Post('register')
  @ResponseMessage('Register a new user')
  async createUser(@Body() register: RegisterDTO) {
    const { name, age, email, password, address, gender } = register;
    const command = new RegisterCommand(name, age, email, password, address, gender);
    return this.commandBus.execute(command);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ResponseMessage('User login')
  @ResponseMessage('Login successfully')
  async login(@Res({ passthrough: true }) response: Response, @Request() request) {
    const command = new LoginCommand(request.user, response);
    return this.commandBus.execute(command);
  }

  @Get('/account')
  @ResponseMessage('Get user information')
  async getAccount(@User() user) {
    return { user };
  }

  @Public()
  @Get('/refresh')
  @ResponseMessage('Get user by refresh token')
  async refreshToken(@Request() request, @Res({ passthrough: true }) response: Response) {
    const refreshToken = request.cookies['refresh_token'];
    const command = new GetNewAccessTokenCommand(refreshToken, response);
    return this.commandBus.execute(command);
  }
}
