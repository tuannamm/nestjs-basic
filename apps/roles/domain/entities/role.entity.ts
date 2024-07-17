import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { PermissionEntity } from 'apps/permissions/domain/entities/permission.entity';

export type RoleDocument = HydratedDocument<RoleEntity>;

@Schema({ timestamps: true, versionKey: false })
export class RoleEntity {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  isActive: boolean;

  @Prop({ type:[ mongoose.Schema.Types.ObjectId], ref: PermissionEntity.name })
  permissions: string[];

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

export const RoleSchema = SchemaFactory.createForClass(RoleEntity);

interface Permission {}
