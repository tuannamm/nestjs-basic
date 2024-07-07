import { IsString } from 'class-validator';

export class CreateUserCVDTO {
  @IsString()
  url: string;

  @IsString()
  company: string;

  @IsString()
  job: string;
}

export class CreateResumeDTO {
  @IsString()
  url: string;

  @IsString()
  email: string;

  @IsString()
  status: string;

  @IsString()
  job: string;

  company: string;

  userId: string;
}
