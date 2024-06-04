import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CompanyEntity } from 'apps/company/entities/company.entity';
import { CanNotCreateCompany, MissingAddress, MissingDescription, MissingName } from 'apps/company/company.exception';
import { PrintLog } from 'libs/decorators/print-log/print-log.decorator';
import { CreateCompanyCommand } from '../create-company.command';

@CommandHandler(CreateCompanyCommand)
export class CreateCompanyHandler implements ICommandHandler<CreateCompanyCommand> {
  constructor(
    @InjectModel(CompanyEntity.name)
    private readonly companyModel: Model<CompanyEntity>
  ) {}

  @PrintLog
  async execute(command: CreateCompanyCommand) {
    const { name, address, description, user } = command;

    if (!name) throw new MissingName();
    if (!address) throw new MissingAddress();
    if (!description) throw new MissingDescription();

    const result = await this.companyModel.create({
      name,
      address,
      description,
      createdBy: user
    });

    if (!result) throw new CanNotCreateCompany();

    return result;
  }
}
