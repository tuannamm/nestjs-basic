import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from 'apps/users/domain/entities/user.entities';
import { PrintLog } from 'libs/print-log/print-log.decorator';
import { Model } from 'mongoose';

import { FindUserByIdQuery } from '../find-user-by-id.query';
import { CanNotGetUser } from 'apps/users/user.exception';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements ICommandHandler<FindUserByIdQuery> {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>
  ) {}

  @PrintLog
  async execute(query: FindUserByIdQuery) {
    const { id } = query;

    const user = await this.userModel.findById(id);

    if (!user) throw new CanNotGetUser();

    return user;
  }
}
