import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateCompanyCommand } from '../application/create-company.command';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { User } from 'libs/decorators/user/user.decorator';
import { IUser } from 'apps/auth/presentation/user.interface';
import { PrintLog } from 'libs/decorators/print-log/print-log.decorator';
import { UpdateCompanyCommand } from '../application/update-company.command';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { DeleteCompanyCommand } from '../application/delete-company.command';

@Controller('companies')
export class CompanyController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @PrintLog
  async createCompany(@Body() data: CreateCompanyDTO, @User() user: IUser) {
    const { name, address, description } = data;
    const command = new CreateCompanyCommand(name, description, address, user);
    return this.commandBus.execute(command);
  }

  @Patch(':id')
  @PrintLog
  async updateCompany(@Param() id: string, @Body() data: UpdateCompanyDto, @User() user: IUser) {
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
}
