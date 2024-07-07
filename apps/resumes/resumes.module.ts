import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ResumesController } from './presentation/resumes.controller';
import { ResumeEntity, ResumeSchema } from './domain/entities/resume.entity';
import { CreateResumeHandler } from './application/commands/handlers/create-resume.handler';
import { UpdateResumeHandler } from './application/commands/handlers/update-resume.handler';
import { DeleteResumeHandler } from './application/commands/handlers/delete-resume.handler';
import { FindListResumesByUserHandler } from './application/queries/handlers/find-list-resumes-by-user';
import { FindResumeByIdHandler } from './application/queries/handlers/find-resume-by-id.handler';
import { FindListResumesHandler } from './application/queries/handlers/find-list-resumes.handler';

const handlers = [
  CreateResumeHandler,
  UpdateResumeHandler,
  DeleteResumeHandler,
  FindListResumesByUserHandler,
  FindResumeByIdHandler,
  FindListResumesHandler
];

const repositories = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_DB_URI')
    }),
    inject: [ConfigService]
  }),
  MongooseModule.forFeature([{ name: ResumeEntity.name, schema: ResumeSchema }])
];

@Module({
  imports: [CqrsModule, ...repositories],
  controllers: [ResumesController],
  providers: [...handlers]
})
export class ResumesModule {}
