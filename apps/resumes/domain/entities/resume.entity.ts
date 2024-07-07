import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { CompanyEntity } from 'apps/company/entities/company.entity';
import { JobEntity } from 'apps/job/domain/entities/job.entities';

export type ResumeDocument = HydratedDocument<ResumeEntity>;

@Schema({ timestamps: true, versionKey: false })
export class ResumeEntity {
  @Prop()
  email: string;

  @Prop()
  userId: string;

  @Prop()
  url: string;

  @Prop()
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: CompanyEntity.name })
  company: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: JobEntity.name })
  job: string;

  @Prop({ type: mongoose.Schema.Types.Array })
  history: {
    status: string;
    updatedAt: Date;
    updatedBy: { _id: mongoose.Schema.Types.ObjectId; email: string };
  }[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop({ type: Object })
  createdBy: { _id: mongoose.Schema.Types.ObjectId; email: string };

  @Prop({ type: Object })
  updatedBy: { _id: mongoose.Schema.Types.ObjectId; email: string };

  @Prop({ type: Object })
  deletedBy: { _id: mongoose.Schema.Types.ObjectId; email: string };
}

export const ResumeSchema = SchemaFactory.createForClass(ResumeEntity);
