import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { FindListResumesByUserQuery } from '../find-list-resumes-by-user';
import { InjectModel } from '@nestjs/mongoose';
import { ResumeEntity } from 'apps/resumes/domain/entities/resume.entity';
import { Model } from 'mongoose';

@QueryHandler(FindListResumesByUserQuery)
export class FindListResumesByUserHandler implements ICommandHandler<FindListResumesByUserQuery> {
  constructor(
    @InjectModel(ResumeEntity.name)
    private readonly resumeModel: Model<ResumeEntity>
  ) {}

  async execute(query: FindListResumesByUserQuery): Promise<any> {
    const { user } = query;

    const result = await this.resumeModel.find({ userId: user._id });
    return result;
  }
}
