import { ServiceException } from 'libs/exception/exception';

export enum AuthExceptionCode {
  USER_DOES_NOT_EXIST = 301,
  WRONG_CREDENTIALS = 302
}

export class UserDoesNotExist extends ServiceException {
  constructor() {
    super('User does not exist', AuthExceptionCode.USER_DOES_NOT_EXIST);
  }
}

export class WrongCredentials extends ServiceException {
  constructor() {
    super('Wrong credentials', AuthExceptionCode.WRONG_CREDENTIALS);
  }
}
