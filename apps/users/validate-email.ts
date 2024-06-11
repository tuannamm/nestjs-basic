import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator
} from 'class-validator';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { UserDocument, UserEntity } from './domain/entities/user.entities';

import { UserService } from './user.service';

@Injectable()
@ValidatorConstraint({ name: 'isEmailUserAlreadyExist', async: true })
export class IsEmailUserAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: SoftDeleteModel<UserDocument>
  ) {}

  async userExists({ email }): Promise<boolean> {
    const existed = await this.userModel.findOne({ email });
    return !!existed;
  }

  async validate(text: string) {
    const validate = await this.userExists({ email: text });
    return !validate;
  }
}

export function IsEmailUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUserAlreadyExistConstraint
    });
  };
}
