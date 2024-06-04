import { Controller, Post, Body, Patch, Param, Delete, Get, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrintLog } from 'libs/decorators/print-log/print-log.decorator';
import { User } from 'libs/decorators/user/user.decorator';

import { CreateCompanyDTO } from './dto/create-company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';

import { CreateCompanyCommand } from '../application/commands/create-company.command';
import { DeleteCompanyCommand } from '../application/commands/delete-company.command';
import { UpdateCompanyCommand } from '../application/commands/update-company.command';

import { IUser } from 'apps/auth/presentation/user.interface';
import { FindListCompanyQuery } from '../application/queries/find-list-company.query';

@Controller('companies')
export class CompanyController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  @PrintLog
  async createCompany(@Body() data: CreateCompanyDTO, @User() user: IUser) {
    const { name, address, description } = data;
    const command = new CreateCompanyCommand(name, description, address, user);
    return this.commandBus.execute(command);
  }

  @Patch(':id')
  @PrintLog
  async updateCompany(@Param() id: string, @Body() data: UpdateCompanyDTO, @User() user: IUser) {
    const { name, address, description } = data;
    const command = new UpdateCompanyCommand(id, name, description, address, user);
    return this.commandBus.execute(command);
  }

  @Delete(':id')
  @PrintLog
  async deleteCompany(@Param() id: string, @User() user: IUser) {
    const command = new DeleteCompanyCommand(id, user);
    return this.commandBus.execute(command);
  }

  @Get()
  async findListCompany(@Query('page') currentPage: string, @Query('limit') limit: string, @Query() qs) {
    const query = new FindListCompanyQuery(currentPage, limit, qs);
    return this.queryBus.execute(query);
  }
}
