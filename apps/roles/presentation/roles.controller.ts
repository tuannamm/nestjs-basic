import { Controller, Post, Body, Patch, Param, Get, Query, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { User } from 'libs/decorators/user.decorator';
import { ResponseMessage } from 'libs/decorators/response-message.decorator';

import { CreateRoleDTO } from './dto/create-role.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';

import { GetListRoleQuery } from '../application/queries/get-list-role.query';
import { GetRoleByIdQuery } from '../application/queries/get-role-by-id.query';

import { DeleteRoleCommand } from '../application/commands/delete-role.command';
import { UpdateRoleCommand } from '../application/commands/update-role.command';
import { CreateRoleCommand } from '../application/commands/create-role.command';

@Controller('roles')
export class RoleController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  @ResponseMessage('Create a new role')
  async createRole(@Body() createPermissionData: CreateRoleDTO, @User() user) {
    const { name, description, isActive, permissions } = createPermissionData;
    const command = new CreateRoleCommand(name, description, isActive, permissions, user);
    return this.commandBus.execute(command);
  }

  @Patch(':id')
  @ResponseMessage('Update a role')
  async updatePermission(@Body() updateRoleData: UpdateRoleDTO, @Param() id: string, @User() user: any) {
    const { name, description, isActive, permissions } = updateRoleData;
    const command = new UpdateRoleCommand(id, name, description, isActive, permissions, user);
    return this.commandBus.execute(command);
  }

  @Get()
  @ResponseMessage('Get list role')
  async getListJobs(@Query('current') currentPage: string, @Query('pageSize') limit: string, @Query() qs) {
    const query = new GetListRoleQuery(currentPage, limit, qs);
    return this.queryBus.execute(query);
  }

  @Get(':id')
  @ResponseMessage('Fetch a role by id')
  async getPermissionById(@Param() id: string) {
    const query = new GetRoleByIdQuery(id);
    return this.queryBus.execute(query);
  }

  @Delete(':id')
  @ResponseMessage('Delete a role')
  async deleteJob(@Param('id') id: string, @User() user: any) {
    const command = new DeleteRoleCommand(id, user);
    return this.commandBus.execute(command);
  }
}
