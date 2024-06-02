import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserEntity } from 'apps/users/domain/entities/user.entities';
import { PrintLog } from 'libs/decorators/print-log/print-log.decorator';
import { Model } from 'mongoose';

import { FindUserByIdQuery } from '../find-user-by-id.query';
import { CanNotGetUser } from 'apps/users/user.exception';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements ICommandHandler<FindUserByIdQuery> {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: SoftDeleteModel<UserDocument>
  ) {}

  @PrintLog
  async execute(query: FindUserByIdQuery) {
    const { id } = query;

    const user = await this.userModel.findById(id);

    if (!user) throw new CanNotGetUser();

    return user;
  }
}
