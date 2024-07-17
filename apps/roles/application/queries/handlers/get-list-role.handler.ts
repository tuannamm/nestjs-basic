import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import aqp from 'api-query-params';

import { GetListRoleQuery } from '../get-list-role.query';
import { RoleEntity } from 'apps/roles/domain/entities/role.entity';

@QueryHandler(GetListRoleQuery)
export class GetListRoleQueryHandler implements ICommandHandler<GetListRoleQuery> {
  constructor(
    @InjectModel(RoleEntity.name)
    private readonly roleModel: Model<RoleEntity>
  ) {}

  async execute(query: GetListRoleQuery) {
    const { currentPage, limit, qs } = query;
    const { filter, sort, population } = aqp(qs);

    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;

    const totalItem = (await this.roleModel.find(filter)).length;
    const totalPage = Math.ceil(totalItem / defaultLimit);

    const result = await this.roleModel
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
