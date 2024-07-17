import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { UserDocument, UserEntity } from './domain/entities/user.entities';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: SoftDeleteModel<UserDocument>
  ) {}

  async findOneByEmail({ email }): Promise<UserEntity | null> {
    return this.userModel.findOne({ email }).populate({ path: "role", select: { name: 1, permissions: 1 } });
  }

  async registerUser({ email, password, name, age, gender, address }): Promise<any> {
    const result = await this.userModel.create({
      email,
      password,
      name,
      age,
      gender,
      address,
      role: "USER"
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
    return this.userModel.findOne({ refreshToken });
  }
}
