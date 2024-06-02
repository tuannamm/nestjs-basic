import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema({ timestamps: true })
export class UserEntity {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop({
    required: true
  })
  email: string;

  @Prop({
    required: true
  })
  password: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;

  @Prop()
  createdDate: Date;

  @Prop()
  updatedDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
