import { ServiceException } from 'libs/exception/exception';

export enum AuthExceptionCode {
  USER_DOES_NOT_EXIST = 301
}

export class UserDoesNotExist extends ServiceException {
  constructor() {
    super('User does not exist', AuthExceptionCode.USER_DOES_NOT_EXIST);
  }
}
