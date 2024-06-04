import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateUserCommand } from '../application/create-user.command';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrintLog } from 'libs/decorators/print-log.decorator';
import { FindUserByIdQuery } from '../application/find-user-by-id.query';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdateUserCommand } from '../application/update-user.command';
import { DeleteUserCommand } from '../application/delete-user.command';

@Controller('users')
export class UserController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post('create')
  @PrintLog
  async createUser(@Body() createUserBody: CreateUserDTO) {
    const { name, age, email, password, phone, address } = createUserBody;
    const command = new CreateUserCommand(name, age, email, password, phone, address);
    return this.commandBus.execute(command);
  }

  @Get(':id')
  @PrintLog
  async getUserById(@Param('id') id: string) {
    console.log('id', id);
    const query = new FindUserByIdQuery(id);
    return this.queryBus.execute(query);
  }

  @Post()
  @PrintLog
  async updateUserById(@Body() updateUserBody: UpdateUserDTO) {
    const { id, name, address, age, email, phone } = updateUserBody;
    const command = new UpdateUserCommand(id, name, address, age, email, phone);
    return this.commandBus.execute(command);
  }

  @Delete(':id')
  @PrintLog
  async deleteUserById(@Param('id') id: string) {
    const command = new DeleteUserCommand(id);
    return this.commandBus.execute(command);
  }
}
