import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDTO {
  @IsNotEmpty({
    message: 'Name is required'
  })
  name: string;

  @IsNotEmpty({
    message: 'Description is required'
  })
  description: string;

  @IsNotEmpty({
    message: 'Address is required'
  })
  address: string;
}
