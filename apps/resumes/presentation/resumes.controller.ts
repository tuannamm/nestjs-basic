import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Controller, Post, Body, Inject, Patch, Param, Get, Query, Delete } from '@nestjs/common';

import { ResponseMessage } from 'libs/decorators/response-message.decorator';
import { CreateUserCVDTO } from './dto/create-resume.dto';
import { User } from 'libs/decorators/user.decorator';

import { UpdateResumeCommand } from '../application/commands/update-resumes.command';
import { CreateResumeCommand } from '../application/commands/create-resumes.command';
import { FindListResumesQuery } from '../application/queries/find-list-resumes.query';
import { DeleteResumeCommand } from '../application/commands/delete-resume.command';
import { FindResumeByIdQuery } from '../application/queries/find-resume-by-id.query';
import { FindListResumesByUserQuery } from '../application/queries/find-list-resumes-by-user';

@Controller('resumes')
export class ResumesController {
  @Inject()
  private readonly commandBus: CommandBus;

  @Inject()
  private readonly queryBus: QueryBus;

  @Post()
  @ResponseMessage('Created a new resume')
  async createResumes(@Body() createResumeBody: CreateUserCVDTO, @User() user) {
    const { url, company, job } = createResumeBody;
    const command = new CreateResumeCommand(url, company, job, user);
    return this.commandBus.execute(command);
  }

  @Patch(':id')
  @ResponseMessage('Updated a resume')
  async updateResumes(@Param('id') id: string, @Body('status') status: string, @User() user) {
    const command = new UpdateResumeCommand(id, status, user);
    return this.commandBus.execute(command);
  }

  @Get()
  @ResponseMessage('Get list resumes')
  async findListResumes(@Query('current') currentPage: string, @Query('pageSize') limit: string, @Query() qs) {
    const query = new FindListResumesQuery(currentPage, limit, qs);
    return this.queryBus.execute(query);
  }

  @Delete(':id')
  @ResponseMessage('Deleted a resume')
  async deleteResumes(@Param('id') id: string, @User() user) {
    const command = new DeleteResumeCommand(id, user);
    return this.commandBus.execute(command);
  }

  @Get(':id')
  @ResponseMessage('Get resume by id')
  async findResumeById(@Param('id') id: string) {
    const query = new FindResumeByIdQuery(id);
    return this.queryBus.execute(query);
  }

  @Post('by-user')
  @ResponseMessage('Get resumes by user')
  async findResumeByUser(@User() user: any) {
    const query = new FindListResumesByUserQuery(user);
    return this.queryBus.execute(query);
  }
}
