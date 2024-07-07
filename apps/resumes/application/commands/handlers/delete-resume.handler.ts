import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { ResumeDocument, ResumeEntity } from 'apps/resumes/domain/entities/resume.entity';
import { DeleteResumeCommand } from '../delete-resume.command';

@CommandHandler(DeleteResumeCommand)
export class DeleteResumeHandler implements ICommandHandler<DeleteResumeCommand> {
  constructor(
    @InjectModel(ResumeEntity.name)
    private readonly companyModel: SoftDeleteModel<ResumeDocument>
  ) {}

  async execute(command: DeleteResumeCommand) {
    const { id, user } = command;
    const { _id, email } = user;

    await this.companyModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id,
          email
        }
      }
    );
    const result = await this.companyModel.softDelete({ _id: id });

    return result;
  }
}
