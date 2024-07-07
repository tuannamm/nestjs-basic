import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateResumeCommand } from '../update-resumes.command';
import { InjectModel } from '@nestjs/mongoose';
import { ResumeEntity } from 'apps/resumes/domain/entities/resume.entity';
import { Model } from 'mongoose';

@CommandHandler(UpdateResumeCommand)
export class UpdateResumeHandler implements ICommandHandler<UpdateResumeCommand> {
  constructor(
    @InjectModel(ResumeEntity.name)
    private readonly resumeModel: Model<ResumeEntity>
  ) {}

  async execute(command: UpdateResumeCommand): Promise<any> {
    const { id, status, user } = command;
    const { _id, email } = user;

    const result = await this.resumeModel.findOneAndUpdate(
      { _id: id },
      {
        status,
        $push: {
          history: {
            status,
            updatedAt: new Date(),
            updatedBy: {
              _id,
              email
            }
          }
        }
      }
    );

    return result;
  }
}
