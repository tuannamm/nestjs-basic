export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly age: number,
    public readonly email: string,
    public readonly phone: string,
    public readonly address: string,
    public readonly role: string,
    public readonly gender: string,
    public readonly company: any,
    public readonly request: any
  ) {}
}
