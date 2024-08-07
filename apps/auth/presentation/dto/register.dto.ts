import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterDTO {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;

  @IsString()
  address: string;

  @IsString()
  gender: string;
}
