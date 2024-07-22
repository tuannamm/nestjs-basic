import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { UserDocument, UserEntity } from './domain/entities/user.entities';
import { RoleDocument, RoleEntity } from 'apps/roles/domain/entities/role.entity';
import { USER_ROLE } from 'apps/databases/sample';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: SoftDeleteModel<UserDocument>,

    @InjectModel(RoleEntity.name)
    private readonly roleModel: SoftDeleteModel<RoleDocument>
  ) {}

  async findOneByEmail({ email }): Promise<UserEntity | null> {
    return this.userModel.findOne({ email }).populate({ path: 'role', select: { name: 1 } });
  }

  async registerUser({ email, password, name, age, gender, address }): Promise<any> {
    const userRole = await this.roleModel.findOne({ name: USER_ROLE });
    const result = await this.userModel.create({
      email,
      password,
      name,
      age,
      gender,
      address,
      role: userRole._id
    });

    return {
      _id: result._id,
      createdAt: result.createdAt
    };
  }

  async userExists({ email }): Promise<boolean> {
    const existed = await this.userModel.findOne({ email });
    return !!existed;
  }

  async updateUserRefreshToken(refreshToken: string, _id: string) {
    return await this.userModel.updateOne({ _id }, { refreshToken });
  }

  async findOneByToken({ refreshToken }): Promise<UserEntity | null> {
    return await this.userModel.findOne({ refreshToken }).populate({ path: 'role', select: { name: 1 } });
  }
}
