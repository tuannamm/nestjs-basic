import { IsEmailUserAlreadyExist } from 'apps/users/validate-email';
import { Type } from 'class-transformer';
import { IsEmail, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

import mongoose from 'mongoose';

export class CompanyDTO {
  @IsString()
  _id: mongoose.Schema.Types.ObjectId;

  @IsString()
  name: string;
}

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsEmail()
  @IsNotEmpty()
  // @IsEmailUserAlreadyExist({
  //   message: 'Mail $value already exists. Choose another one.'
  // })
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsMongoId()
  role: string;

  @IsString()
  gender: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CompanyDTO)
  @IsOptional()
  company: CompanyDTO;
}
