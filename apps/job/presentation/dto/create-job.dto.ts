import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class CompanyDTO {
  @IsString()
  _id: mongoose.Schema.Types.ObjectId;

  @IsString()
  name: string;
}

export class CreateJobDTO {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => CompanyDTO)
  company: CompanyDTO;

  @IsString()
  location: string;

  @IsNumber()
  salary: number;

  @IsNumber()
  quantity: number;

  @IsString()
  level: string;

  @IsString()
  description: string;

  startDate: Date;

  endDate: Date;

  @IsBoolean()
  isActive: boolean;
}
