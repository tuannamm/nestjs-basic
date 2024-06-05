import { Body, Controller, Delete, Get, Param, Post, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';


import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

import { PrintLog } from 'libs/decorators/print-log.decorator';
import { ResponseMessage } from 'libs/decorators/response-message.decorator';
import { Public } from 'libs/decorators/public.decorator';


import { FindUserByIdQuery } from '../application/find-user-by-id.query';

import { CreateUserCommand } from '../application/create-user.command';
import { UpdateUserCommand } from '../application/update-user.command';
import { DeleteUserCommand } from '../application/delete-user.command';

@Controller('users')
export class UserController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Public()
  @Post('create')
  @ResponseMessage('Register a new user')
  @PrintLog
  async createUser(@Body() createUserBody: CreateUserDTO){
    const { name, age, email, password, address, gender } = createUserBody;
    const command = new CreateUserCommand(name, age, email, password, address, gender);
    return this.commandBus.execute(command);
  }

  @Get(':id')
  @PrintLog
  async getUserById(@Param('id') id: string) {
    const query = new FindUserByIdQuery(id);
    return this.queryBus.execute(query);
  }

  @Post()
  @PrintLog
  async updateUserById(@Body() updateUserBody: UpdateUserDTO) {
    const { id, name, age, email, phone, address, role, company, gender } = updateUserBody;
    const command = Builder<UpdateUserCommand>().id(id).name(name).age(age).email(email).phone(phone).address(address).role(role).company(company).gender(gender).build();
    return this.commandBus.execute(command);
  }

  @Delete(':id')
  @PrintLog
  async deleteUserById(@Param('id') id: string) {
    const command = new DeleteUserCommand(id);
    return this.commandBus.execute(command);
  }
}
