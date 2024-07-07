import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { FindResumeByIdQuery } from '../find-resume-by-id.query';
import { InjectModel } from '@nestjs/mongoose';
import { ResumeEntity } from 'apps/resumes/domain/entities/resume.entity';
import { Model } from 'mongoose';

@QueryHandler(FindResumeByIdQuery)
export class FindResumeByIdHandler implements ICommandHandler<FindResumeByIdQuery> {
  constructor(
    @InjectModel(ResumeEntity.name)
    private readonly resumeModel: Model<ResumeEntity>
  ) {}

  async execute(command: FindResumeByIdQuery): Promise<any> {
    const { id } = command;

    const result = await this.resumeModel.findById(id);

    return result;
  }
}
