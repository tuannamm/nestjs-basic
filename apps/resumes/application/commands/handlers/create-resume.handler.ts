import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ResumeEntity } from 'apps/resumes/domain/entities/resume.entity';
import { CreateResumeCommand } from '../create-resumes.command';

@CommandHandler(CreateResumeCommand)
export class CreateResumeHandler implements ICommandHandler<CreateResumeCommand> {
  constructor(
    @InjectModel(ResumeEntity.name)
    private readonly resumeModel: Model<ResumeEntity>
  ) {}

  async execute(command: CreateResumeCommand) {
    const { url, company, job, user } = command;
    const { _id, email } = user;

    const result = await this.resumeModel.create({
      email,
      userId: user._id,
      status: 'PENDING',
      history: [
        {
          status: 'PENDING',
          updatedAt: new Date(),
          updatedBy: {
            _id,
            email
          }
        }
      ],
      url,
      company,
      job,
      createdBy: {
        _id,
        email
      }
    });

    return {
      _id: result?._id,
      createAt: result?.createdAt
    };
  }
}
