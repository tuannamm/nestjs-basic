import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import aqp from 'api-query-params';
import { InjectModel } from '@nestjs/mongoose';

import { FindListResumesQuery } from '../find-list-resumes.query';
import { ResumeEntity } from 'apps/resumes/domain/entities/resume.entity';

@QueryHandler(FindListResumesQuery)
export class FindListResumesHandler implements ICommandHandler<FindListResumesQuery> {
  constructor(
    @InjectModel(ResumeEntity.name)
    private readonly resumeModel: Model<ResumeEntity>
  ) {}

  async execute(command: FindListResumesQuery): Promise<any> {
    const { currentPage, limit, qs } = command;
    const { filter, sort, population, projection } = aqp(qs);

    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;

    const totalItem = (await this.resumeModel.find(filter)).length;
    const totalPage = Math.ceil(totalItem / defaultLimit);

    const result = await this.resumeModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .select(projection as any)
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
