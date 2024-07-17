import { Controller, Post, Body, Patch, Param, Get, Query, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreatePermissionCommand } from '../application/commands/create-permission.command';
import { CreatePermissionDTO } from './dto/create-permission.dto';
import { User } from 'libs/decorators/user.decorator';
import { ResponseMessage } from 'libs/decorators/response-message.decorator';
import { UpdatePermissionDTO } from './dto/update-permission.dto';
import { UpdatePermissionCommand } from '../application/commands/update-permission.command';
import { GetListPermissionQuery } from '../application/queries/get-list-permission.query';

import { DeletePermissionCommand } from '../application/commands/delete-permission.command';
import { GetPermissionByIdQuery } from '../application/queries/get-permission-by-id.query';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  @ResponseMessage('Create a new permission')
  async createPermission(@Body() createPermissionData: CreatePermissionDTO, @User() user) {
    const { name, apiPath, method, module } = createPermissionData;
    const command = new CreatePermissionCommand(name, apiPath, method, module, user);
    return this.commandBus.execute(command);
  }

  @Patch(':id')
  @ResponseMessage('Update a permission')
  async updatePermission(@Body() updatePermissionData: UpdatePermissionDTO, @Param() id: string, @User() user: any) {
    const { name, apiPath, method, module } = updatePermissionData;
    const command = new UpdatePermissionCommand(id, name, apiPath, method, module, user);
    return this.commandBus.execute(command);
  }

  @Get()
  @ResponseMessage('Get list permission')
  async getListJobs(@Query('current') currentPage: string, @Query('pageSize') limit: string, @Query() qs) {
    const query = new GetListPermissionQuery(currentPage, limit, qs);
    return this.queryBus.execute(query);
  }

  @Get(':id')
  @ResponseMessage('Fetch a permission by id')
  async getPermissionById(@Param() id: string) {
    const query = new GetPermissionByIdQuery(id);
    return this.queryBus.execute(query);
  }

  @Delete(':id')
  @ResponseMessage('Delete a permission')
  async deleteJob(@Param('id') id: string, @User() user: any) {
    const command = new DeletePermissionCommand(id, user);
    return this.commandBus.execute(command);
  }
}
