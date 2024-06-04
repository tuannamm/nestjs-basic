import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { PrintLog } from 'libs/decorators/print-log/print-log.decorator';
import { CanNotUpdateCompany } from 'apps/company/company.exception';
import { CompanyEntity } from 'apps/company/entities/company.entity';
import { UpdateCompanyCommand } from '../update-company.command';

@CommandHandler(UpdateCompanyCommand)
export class UpdateCompanyHandler implements ICommandHandler<UpdateCompanyCommand> {
  constructor(
    @InjectModel(CompanyEntity.name)
    private readonly companyModel: Model<CompanyEntity>
  ) {}

  @PrintLog
  async execute(command: UpdateCompanyCommand): Promise<any> {
    const { id, name, address, description, user } = command;

    const updated = await this.companyModel.findByIdAndUpdate(new Types.ObjectId(id), {
      name,
      address,
      description,
      updatedBy: user
    });

    if (!updated) throw new CanNotUpdateCompany();

    return updated;
  }
}
