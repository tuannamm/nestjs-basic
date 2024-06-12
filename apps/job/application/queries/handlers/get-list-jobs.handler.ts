import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import aqp from 'api-query-params';

import { JobEntity } from 'apps/job/domain/entities/job.entities';
import { GetListJobsQuery } from '../get-list-jobs.query';

@QueryHandler(GetListJobsQuery)
export class GetListJobsQueryHandler implements ICommandHandler<GetListJobsQuery> {
  constructor(
    @InjectModel(JobEntity.name)
    private readonly jobModel: Model<JobEntity>
  ) {}

  async execute(query: GetListJobsQuery) {
    const { currentPage, limit, qs } = query;
    const { filter, sort, population } = aqp(qs);

    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;

    const totalItem = (await this.jobModel.find(filter)).length;
    const totalPage = Math.ceil(totalItem / defaultLimit);

    const result = await this.jobModel
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
