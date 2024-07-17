import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { GetPermissionByIdQuery } from '../get-permission-by-id.query';
import { PermissionEntity } from 'apps/permissions/domain/entities/permission.entity';

@QueryHandler(GetPermissionByIdQuery)
export class GetPermissionByIdHandler implements IQueryHandler<GetPermissionByIdQuery> {
  constructor(
    @InjectModel(PermissionEntity.name)
    private readonly permissionModel: Model<PermissionEntity>
  ) {}

  async execute(query: GetPermissionByIdQuery) {
    const { id } = query;

    const result = await this.permissionModel.findById(new mongoose.Types.ObjectId(id));

    return result;
  }
}
