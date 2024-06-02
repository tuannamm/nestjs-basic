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
    return this.userModel.findOne({ email }).exec();
  }
}
