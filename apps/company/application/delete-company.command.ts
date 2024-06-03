import { IUser } from 'apps/auth/presentation/user.interface';

export class DeleteCompanyCommand {
  constructor(public readonly id: string, public readonly user: IUser) {}
}
