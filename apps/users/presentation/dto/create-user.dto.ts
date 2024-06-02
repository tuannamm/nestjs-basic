import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
}
