import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class CompanyDTO {
  @IsString()
  _id: mongoose.Schema.Types.ObjectId;;

  @IsString()
  name: string;
}

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  age: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  role: string

  @IsString()
  gender: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CompanyDTO)
  company: CompanyDTO
}


