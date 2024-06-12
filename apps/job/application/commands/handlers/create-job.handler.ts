import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateJobCommand } from '../create-job.command';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobEntity } from 'apps/job/domain/entities/job.entities';

@CommandHandler(CreateJobCommand)
export class CreateJobHandler implements ICommandHandler<CreateJobCommand> {
  constructor(
    @InjectModel(JobEntity.name)
    private readonly jobModel: Model<JobEntity>
  ) {}

  async execute(command: CreateJobCommand) {
    const {
      name,
      skills,
      company,
      location,
      salary,
      quantity,
      level,
      description,
      startDate,
      endDate,
      isActive,
      user
    } = command;

    const result = await this.jobModel.create({
      name,
      skills,
      company,
      location,
      salary,
      quantity,
      level,
      description,
      startDate,
      endDate,
      isActive,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });

    return {
      _id: result._id,
      createdAt: result.createdAt
    };
  }
}
