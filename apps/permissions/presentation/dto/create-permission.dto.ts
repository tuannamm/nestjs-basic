import { IsString } from 'class-validator';

export class CreatePermissionDTO {
  @IsString()
  name: string;

  @IsString()
  apiPath: string;

  @IsString()
  method: string;

  @IsString()
  module: string;
}
