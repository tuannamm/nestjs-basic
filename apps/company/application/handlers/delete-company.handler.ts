import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { CompanyDocument, CompanyEntity } from 'apps/company/entities/company.entity';
import { DeleteCompanyCommand } from '../delete-company.command';

@CommandHandler(DeleteCompanyCommand)
export class DeleteCompanyHandler implements ICommandHandler<DeleteCompanyCommand> {
  constructor(
    @InjectModel(CompanyEntity.name)
    private readonly companyModel: SoftDeleteModel<CompanyDocument>
  ) {}

  async execute(command: DeleteCompanyCommand) {
    const { id, user } = command;

    const deleted = await this.companyModel.deleteOne({ _id: new Types.ObjectId(id) }, { deletedBy: user });

    if (!deleted) throw new Error('Can not delete company');

    return deleted;
  }
}
