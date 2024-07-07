import { IsString } from 'class-validator';

export class CreateCompanyDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsString()
  logo: string;

  @IsString()
  location: string;
}
