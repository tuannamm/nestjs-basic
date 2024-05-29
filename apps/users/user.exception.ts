import { ServiceException } from 'libs/exception/exception';

export enum UserExceptionCode {
  CAN_NOT_CREATE_USER = 201,
  MISSING_EMAIL = 202,
  MISSING_PASSWORD = 203,
  CAN_NOT_GET_USER = 204,
  MISSING_ID = 205,
  CAN_NOT_UPDATE_USER = 206,
  CAN_NOT_DELETE_USER = 207
}

export class CanNotCreateUser extends ServiceException {
  constructor() {
    super('Can not create user', UserExceptionCode.CAN_NOT_CREATE_USER);
  }
}

export class MissingEmail extends ServiceException {
  constructor() {
    super('Missing email', UserExceptionCode.MISSING_EMAIL);
  }
}

export class MissingPassword extends ServiceException {
  constructor() {
    super('Missing password', UserExceptionCode.MISSING_PASSWORD);
  }
}

export class CanNotGetUser extends ServiceException {
  constructor() {
    super('Can not get user', UserExceptionCode.CAN_NOT_GET_USER);
  }
}

export class MissingId extends ServiceException {
  constructor() {
    super('Missing id', UserExceptionCode.MISSING_ID);
  }
}

export class CanNotUpdateUser extends ServiceException {
  constructor() {
    super('Can not update user', UserExceptionCode.CAN_NOT_UPDATE_USER);
  }
}

export class CanNotDeleteUser extends ServiceException {
  constructor() {
    super('Can not delete user', UserExceptionCode.CAN_NOT_DELETE_USER);
  }
}
