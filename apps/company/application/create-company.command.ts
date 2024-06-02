export class CreateCompanyCommand {
  constructor(public readonly name: string, public readonly description: string, public readonly address: string) {}
}
