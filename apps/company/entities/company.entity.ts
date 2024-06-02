import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<CompanyEntity>;

@Schema({ timestamps: true })
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

  @Prop()
  createdBy: {
    _id: string;
    email: string;
  };

  @Prop()
  updatedBy: {
    _id: string;
    email: string;
  };

  @Prop()
  deletedBy: {
    _id: string;
    email: string;
  };
}

export const CompanySchema = SchemaFactory.createForClass(CompanyEntity);
