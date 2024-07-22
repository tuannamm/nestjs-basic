import { Controller, Post, Body, Patch, Param, Delete, Get, Query, Inject } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrintLog } from 'libs/decorators/print-log.decorator';

import { CreateCompanyDTO } from './dto/create-company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';

import { CreateCompanyCommand } from '../application/commands/create-company.command';
import { DeleteCompanyCommand } from '../application/commands/delete-company.command';
import { UpdateCompanyCommand } from '../application/commands/update-company.command';
import { FindListCompanyQuery } from '../application/queries/find-list-company.query';

import { IUser } from 'apps/auth/presentation/user.interface';
import { ResponseMessage } from 'libs/decorators/response-message.decorator';
import { User } from 'libs/decorators/user.decorator';
import { Public } from 'libs/decorators/public.decorator';
import { FindCompanyByIdQuery } from '../application/queries/find-company-by-id.query';

@Controller('companies')
export class CompanyController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  @PrintLog
  async createCompany(@Body() data: CreateCompanyDTO, @User() user: IUser) {
    const { name, address, description, logo } = data;
    const command = new CreateCompanyCommand(name, description, address, user, logo);
    return this.commandBus.execute(command);
  }

  @Patch(':id')
  @PrintLog
  async updateCompany(@Param() id: string, @Body() data: UpdateCompanyDTO, @User() user: IUser) {
    const { name, address, description, logo } = data;
    const command = new UpdateCompanyCommand(id, name, description, address, user, logo);
    return this.commandBus.execute(command);
  }

  @Delete(':id')
  @PrintLog
  async deleteCompany(@Param() id: string, @User() user: IUser) {
    const command = new DeleteCompanyCommand(id, user);
    return this.commandBus.execute(command);
  }

  @Public()
  @Get()
  @PrintLog
  @ResponseMessage('List company successfully fetched')
  async findListCompany(@Query('current') currentPage: string, @Query('pageSize') limit: string, @Query() qs) {
    const query = new FindListCompanyQuery(currentPage, limit, qs);
    return this.queryBus.execute(query);
  }

  @Public()
  @Get(':id')
  @PrintLog
  @ResponseMessage('Get company successfully')
  async getCompanyById(@Param() id: string) {
    const query = new FindCompanyByIdQuery(id);
    return this.queryBus.execute(query);
  }
}
