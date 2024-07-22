import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
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
    const { _id, email } = user;

    await this.companyModel.updateOne(
      { _id:  new mongoose.Types.ObjectId(id) },
      {
        deletedBy: {
          _id,
          email
        }
      }
    );

    const result = await this.companyModel.softDelete({ _id: new mongoose.Types.ObjectId(id) });

    if (!result) throw new Error('Can not delete company');

    return result;
  }
}
