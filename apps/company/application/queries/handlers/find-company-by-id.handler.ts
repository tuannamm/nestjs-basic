import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCompanyByIdQuery } from '../find-company-by-id.query';
import { InjectModel } from '@nestjs/mongoose';
import { CompanyEntity } from 'apps/company/entities/company.entity';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

@QueryHandler(FindCompanyByIdQuery)
export class FindCompanyByIdHandler implements IQueryHandler<FindCompanyByIdQuery> {
  constructor(
    @InjectModel(CompanyEntity.name)
    private readonly companyModel: Model<CompanyEntity>
  ) {}

  async execute(query: FindCompanyByIdQuery) {
    const { id } = query;

    const result = await this.companyModel.findById(id);

    if (!result) throw new BadRequestException(`Company with ${id} is not existed`)

    return result;
  }
}
