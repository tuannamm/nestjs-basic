import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import aqp from 'api-query-params';

import { CompanyEntity } from 'apps/company/entities/company.entity';
import { FindListCompanyQuery } from '../find-list-company.query';

@QueryHandler(FindListCompanyQuery)
export class FindListCompanyHandler implements IQueryHandler<FindListCompanyQuery> {
  constructor(
    @InjectModel(CompanyEntity.name)
    private readonly companyModel: Model<CompanyEntity>
  ) {}

  async execute(query: FindListCompanyQuery) {
    const { currentPage, limit, qs } = query;
    const { filter, sort, population } = aqp(qs);

    delete filter.page;
    delete filter.limit;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;

    const totalItem = (await this.companyModel.find(filter)).length;
    const totalPage = Math.ceil(totalItem / defaultLimit);

    const result = await this.companyModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        currentPage,
        pageSize: limit,
        pages: totalPage,
        total: totalItem
      },
      result
    };
  }
}
