import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<CompanyEntity>;

@Schema({ timestamps: true, versionKey: false })
export class CompanyEntity {
  @Prop()
  name: string;

  @Prop()
  description: string;

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
  logo: string;
}

export const CompanySchema = SchemaFactory.createForClass(CompanyEntity);
