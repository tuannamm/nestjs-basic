import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDTO } from './create-job.dto';

export class UpdateJobDto extends PartialType(CreateJobDTO) {}
