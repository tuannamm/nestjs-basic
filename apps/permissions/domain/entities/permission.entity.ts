import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<PermissionEntity>;

@Schema({ timestamps: true, versionKey: false })
export class PermissionEntity {
  @Prop()
  name: string;

  @Prop()
  apiPath: string;

  @Prop()
  method: string;

  @Prop()
  module: string;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;

  @Prop()
  createdDate: Date;

  @Prop()
  updatedDate: Date;

  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PermissionSchema = SchemaFactory.createForClass(PermissionEntity);
