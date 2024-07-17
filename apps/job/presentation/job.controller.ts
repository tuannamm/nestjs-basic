import { Controller, Post, Body, Get, Query, Delete, Request, Param, Patch } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateJobDTO } from './dto/create-job.dto';
import { CreateJobCommand } from '../application/commands/create-job.command';
import { UpdateJobCommand } from '../application/commands/update-job.command';

import { ResponseMessage } from 'libs/decorators/response-message.decorator';
import { User } from 'libs/decorators/user.decorator';

import { DeleteJobCommand } from '../application/commands/delete-job.handler';
import { GetJobByIdQuery } from '../application/queries/get-job-by-id.query';
import { GetListJobsQuery } from '../application/queries/get-list-jobs.query';
import { Public } from 'libs/decorators/public.decorator';
import { PrintLog } from 'libs/decorators/print-log.decorator';

@Controller('jobs')
export class JobController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  @ResponseMessage('Create a job')
  async createJob(@Body() createJobDto: CreateJobDTO, @User() user: any) {
    const { name, skills, company, location, salary, quantity, level, description, startDate, endDate, isActive } =
      createJobDto;
    const command = new CreateJobCommand(
      name,
      skills,
      company,
      location,
      salary,
      quantity,
      level,
      description,
      startDate,
      endDate,
      isActive,
      user
    );
    return this.commandBus.execute(command);
  }

  @Public()
  @Get()
  @ResponseMessage('Get list jobs')
  async getListJobs(@Query('current') currentPage: string, @Query('pageSize') limit: string, @Query() qs) {
    const query = new GetListJobsQuery(currentPage, limit, qs);
    return this.queryBus.execute(query);
  }

  @Delete(':id')
  @ResponseMessage('Delete a job')
  async deleteJob(@Param('id') id: string, @Request() request: any) {
    const command = new DeleteJobCommand(id, request);
    return this.commandBus.execute(command);
  }

  @Patch(':id')
  @ResponseMessage('Update a job')
  async updateJob(@Param('id') id: string, @Request() request: any, @Body() updateJob: CreateJobDTO) {
    const command = new UpdateJobCommand(id, request, updateJob);
    return this.commandBus.execute(command);
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Get job by id')
  async getJobById(@Param('id') id: string) {
    const query = new GetJobByIdQuery(id);
    return this.queryBus.execute(query);
  }
}
