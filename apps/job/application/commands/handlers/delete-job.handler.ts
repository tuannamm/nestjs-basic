import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';

import { JobDocument, JobEntity } from 'apps/job/domain/entities/job.entities';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { DeleteJobCommand } from '../delete-job.handler';

@CommandHandler(DeleteJobCommand)
export class DeleteJobHandler implements ICommandHandler<DeleteJobCommand> {
  constructor(
    @InjectModel(JobEntity.name)
    private readonly jobModel: SoftDeleteModel<JobDocument>
  ) {}

  async execute(command: DeleteJobCommand) {
    const { id, request } = command;
    const user = request.user;

    const result = await this.jobModel.softDelete({
      _id: id
    });

    return {
      ...result,
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    };
  }
}
