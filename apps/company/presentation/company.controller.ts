import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateCompanyCommand } from '../application/create-company.command';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { User } from 'libs/decorators/user/user.decorator';
import { IUser } from 'apps/auth/presentation/user.interface';
import { PrintLog } from 'libs/decorators/print-log/print-log.decorator';

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
}
