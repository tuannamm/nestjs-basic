import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { UserDocument, UserEntity } from 'apps/users/domain/entities/user.entities';
import { PrintLog } from 'libs/decorators/print-log.decorator';

import { FindUserByIdQuery } from '../find-user-by-id.query';
import { CanNotGetUser } from 'apps/users/user.exception';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements ICommandHandler<FindUserByIdQuery> {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: SoftDeleteModel<UserDocument>
  ) {}

  @PrintLog
  async execute(query: FindUserByIdQuery) {
    const { id } = query;

    const result = (await this.userModel.findById(id).select('-password')).populate({path: "role", select: {
      name:1,
      _id: 1
    }});

    if (!result) throw new CanNotGetUser();

    return result;
  }
}
