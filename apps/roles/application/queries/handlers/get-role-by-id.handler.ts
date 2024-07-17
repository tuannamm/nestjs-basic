import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { GetRoleByIdQuery } from '../get-role-by-id.query';
import { RoleEntity } from 'apps/roles/domain/entities/role.entity';

@QueryHandler(GetRoleByIdQuery)
export class GetPermissionByIdHandler implements IQueryHandler<GetRoleByIdQuery> {
  constructor(
    @InjectModel(RoleEntity.name)
    private readonly roleModel: Model<RoleEntity>
  ) {}

  async execute(query: GetRoleByIdQuery) {
    const { id } = query;

    const result = await this.roleModel.findById(new mongoose.Types.ObjectId(id)).populate({
      path: 'permissions',
      select: { _id: 1, apiPath: 1, name: 1, method: 1, module: 1 }
    });

    return result;
  }
}
