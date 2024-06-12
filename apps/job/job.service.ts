import { Injectable } from '@nestjs/common';

import { UpdateJobDto } from './presentation/dto/update-job.dto';
import { CreateJobDTO } from './presentation/dto/create-job.dto';

@Injectable()
export class JobService {
  create(createJobDto: CreateJobDTO) {
    return 'This action adds a new job';
  }

  findAll() {
    return `This action returns all job`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
