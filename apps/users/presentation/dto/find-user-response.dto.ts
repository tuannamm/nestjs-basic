import { IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class FindUserResponseDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  role: string;

  createdBy: any;
  updatedBy: any;
  createdAt: Date;
  updatedAt: Date;
  company: CompanyDTO;
}

export class CompanyDTO {
  @IsString()
  _id: mongoose.Schema.Types.ObjectId;

  @IsString()
  name: string;
}
