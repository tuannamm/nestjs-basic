import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetJobByIdQuery } from '../get-job-by-id.query';
import { InjectModel } from '@nestjs/mongoose';
import { JobEntity } from 'apps/job/domain/entities/job.entities';
import { Model } from 'mongoose';

@QueryHandler(GetJobByIdQuery)
export class GetJobByIdHandler implements IQueryHandler<GetJobByIdQuery> {
  constructor(
    @InjectModel(JobEntity.name)
    private readonly jobModel: Model<JobEntity>
  ) {}

  async execute(query: GetJobByIdQuery) {
    const { id } = query;

    const result = await this.jobModel.findById(id);

    return result;
  }
}
