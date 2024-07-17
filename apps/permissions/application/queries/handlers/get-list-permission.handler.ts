import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import aqp from 'api-query-params';

import { GetListPermissionQuery } from '../get-list-permission.query';
import { PermissionEntity } from 'apps/permissions/domain/entities/permission.entity';

@QueryHandler(GetListPermissionQuery)
export class GetListJobsQueryHandler implements ICommandHandler<GetListPermissionQuery> {
  constructor(
    @InjectModel(PermissionEntity.name)
    private readonly permissionModel: Model<PermissionEntity>
  ) {}

  async execute(query: GetListPermissionQuery) {
    const { currentPage, limit, qs } = query;
    const { filter, sort, population } = aqp(qs);

    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;

    const totalItem = (await this.permissionModel.find(filter)).length;
    const totalPage = Math.ceil(totalItem / defaultLimit);

    const result = await this.permissionModel
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
