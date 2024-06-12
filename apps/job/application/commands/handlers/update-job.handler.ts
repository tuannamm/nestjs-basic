import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateJobCommand } from '../update-job.command';
import { InjectModel } from '@nestjs/mongoose';
import { JobEntity } from 'apps/job/domain/entities/job.entities';
import { Model } from 'mongoose';

@CommandHandler(UpdateJobCommand)
export class UpdateJobHandler implements ICommandHandler<UpdateJobCommand> {
  constructor(
    @InjectModel(JobEntity.name)
    private readonly jobModel: Model<JobEntity>
  ) {}

  async execute(command: UpdateJobCommand) {
    const { id, request, updateJob } = command;
    const user = request.user;

    const result = await this.jobModel.findOneAndUpdate(
      {
        _id: id
      },
      {
        ...updateJob,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      }
    );

    return result;
  }
}
