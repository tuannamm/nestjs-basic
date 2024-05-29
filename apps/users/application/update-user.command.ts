import { OmitType } from '@nestjs/mapped-types';
import { CreateUserCommand } from './create-user.command';

export class UpdateUserCommand extends OmitType(CreateUserCommand, ['password']) {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly address: string,
    public readonly age: number,
    public readonly email: string,
    public readonly phone: string
  ) {
    super();
  }
}
