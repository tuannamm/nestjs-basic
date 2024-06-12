export class CreateUserCommand {
  constructor(
    public readonly name: string,
    public readonly age: number,
    public readonly email: string,
    public readonly password: string,
    public readonly address: string,
    public readonly gender: string,
    public readonly role: string,
    public readonly company: any,
    public readonly user: any
  ) {}
}
