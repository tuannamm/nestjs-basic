import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCompanyCommand } from '../create-company.command';
import { InjectModel } from '@nestjs/mongoose';
import { CompanyEntity } from 'apps/company/entities/company.entity';
import { UserEntity } from 'apps/users/domain/entities/user.entities';
import { Model } from 'mongoose';
import { CanNotCreateCompany, MissingAddress, MissingDescription, MissingName } from 'apps/company/company.exception';

@CommandHandler(CreateCompanyCommand)
export class CreateCompanyHandler implements ICommandHandler<CreateCompanyCommand> {
  constructor(
    @InjectModel(CompanyEntity.name)
    private readonly companyModel: Model<UserEntity>
  ) {}

  async execute(command: CreateCompanyCommand) {
    const { name, address, description } = command;

    if (!name) throw new MissingName();
    if (!address) throw new MissingAddress();
    if (!description) throw new MissingDescription();

    const created = await this.companyModel.create({
      name,
      address,
      description
    });

    if (!created) throw new CanNotCreateCompany();

    return created;
  }
}
