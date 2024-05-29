export class CreateUserCommand {
  constructor(
    public readonly name: string,
    public readonly age: number,
    public readonly email: string,
    public readonly password: string,
    public readonly phone: string,
    public readonly address: string
  ) {}
}
