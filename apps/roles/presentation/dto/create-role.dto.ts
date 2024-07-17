import { IsArray, IsBoolean, IsString } from 'class-validator';

export class CreateRoleDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  isActive: boolean;

  @IsArray()
  permissions: string[];
}
