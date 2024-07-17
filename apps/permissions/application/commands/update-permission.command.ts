export class UpdatePermissionCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly apiPath: string,
    public readonly method: string,
    public readonly module: string,
    public readonly user: any
  ) {}
}
