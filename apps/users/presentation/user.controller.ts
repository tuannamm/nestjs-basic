import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';

import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

import { ResponseMessage } from 'libs/decorators/response-message.decorator';

import { FindUserByIdQuery } from '../application/queries/find-user-by-id.query';

import { CreateUserCommand } from '../application/commands/create-user.command';
import { UpdateUserCommand } from '../application/commands/update-user.command';
import { DeleteUserCommand } from '../application/commands/delete-user.command';
import { FindUserResponseDTO } from './dto/find-user-response.dto';
import { FindListUserQuery } from '../application/queries/find-list-user.query';

@Controller('users')
export class UserController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get()
  @ResponseMessage('Get all users')
  async getAllUsers(@Query('current') currentPage: string, @Query('pageSize') limit: string, @Query() qs) {
    const query = new FindListUserQuery(currentPage, limit, qs);
    return this.queryBus.execute(query);
  }

  @Post('create')
  @ResponseMessage('Created a new user')
  async createUser(@Body() createUserBody: CreateUserDTO, @Request() request: any) {
    const { name, age, email, password, address, gender, role, company } = createUserBody;
    const user = request.user;
    const command = new CreateUserCommand(name, age, email, password, address, gender, role, company, user);
    return this.commandBus.execute(command);
  }

  @Get(':id')
  @ResponseMessage('Get user')
  async getUserById(@Param('id') id: string): Promise<FindUserResponseDTO> {
    const query = new FindUserByIdQuery(id);
    return this.queryBus.execute(query);
  }

  @Patch()
  @ResponseMessage('Updated a user')
  async updateUserById(@Body() updateUserBody: UpdateUserDTO, @Request() request: any) {
    const { _id, name, age, email, phone, address, role, company, gender } = updateUserBody;
    const command = new UpdateUserCommand(_id, name, age, email, phone, address, role, gender, company, request);
    return this.commandBus.execute(command);
  }

  @Delete(':id')
  @ResponseMessage('Deleted a user')
  async deleteUserById(@Param('id') id: string, @Request() request: any) {
    const command = new DeleteUserCommand(id, request);
    return this.commandBus.execute(command);
  }
}
