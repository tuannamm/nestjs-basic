import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDTO } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
