import { IUser } from 'apps/auth/presentation/user.interface';

export class UpdateCompanyCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly address: string,
    public readonly user: IUser,
    public readonly logo: string,
    public readonly location: string
  ) {}
}
