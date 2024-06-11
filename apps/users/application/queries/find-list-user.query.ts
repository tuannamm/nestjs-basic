import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import aqp from 'api-query-params';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { FindListUserQuery } from '../find-list-user.query';
import { UserDocument, UserEntity } from 'apps/users/domain/entities/user.entities';

@QueryHandler(FindListUserQuery)
export class FindListUserHandler implements IQueryHandler<FindListUserQuery> {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: SoftDeleteModel<UserDocument>
  ) {}

  async execute(query: FindListUserQuery) {
    const { currentPage, limit, qs } = query;
    const { filter, sort, population } = aqp(qs);

    delete filter.current;
    delete filter.page;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;

    const totalItem = (await this.userModel.find(filter)).length;
    const totalPage = Math.ceil(totalItem / defaultLimit);

    const result = await this.userModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        currentPage,
        pageSize: limit,
        pages: totalPage,
        total: totalItem
      },
      result
    };
  }
}
