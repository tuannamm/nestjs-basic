export class UpdateRoleCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly isActive: boolean,
    public readonly permissions: string[],
    public readonly user: any
  ) {}
}
