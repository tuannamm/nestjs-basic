import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JobService } from './job.service';
import { JobController } from './presentation/job.controller';
import { JobEntity, JobSchema } from './domain/entities/job.entities';
import { CreateJobHandler } from './application/commands/handlers/create-job.handler';
import { GetListJobsQueryHandler } from './application/queries/handlers/get-list-jobs.handler';
import { DeleteJobHandler } from './application/commands/handlers/delete-job.handler';
import { UpdateJobHandler } from './application/commands/handlers/update-job.handler';
import { GetJobByIdHandler } from './application/queries/handlers/get-job-by-id.handler';

const handlers = [CreateJobHandler, GetListJobsQueryHandler, DeleteJobHandler, UpdateJobHandler, GetJobByIdHandler];

const repositories = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_DB_URI')
    }),
    inject: [ConfigService]
  }),
  MongooseModule.forFeature([{ name: JobEntity.name, schema: JobSchema }])
];

@Module({
  imports: [CqrsModule, ...repositories],
  controllers: [JobController],
  providers: [JobService, ...handlers],
  exports: [...handlers]
})
export class JobModule {}
