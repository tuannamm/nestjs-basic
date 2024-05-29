import * as bcrypt from 'bcryptjs';

export class CommonUtils {
  public hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
}
