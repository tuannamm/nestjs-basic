import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CommandBus } from '@nestjs/cqrs';
import { CreateCompanyCommand } from '../application/create-company.command';
import { CreateCompanyDTO } from './dto/create-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  create(@Body() data: CreateCompanyDTO) {
    const { name, address, description } = data;
    const command = new CreateCompanyCommand(name, description, address);
    return this.commandBus.execute(command);
  }
}
