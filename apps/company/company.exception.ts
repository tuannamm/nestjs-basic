import { ServiceException } from 'libs/exception/exception';

export enum CompanyExceptionCode {
  CAN_NOT_CREATE_COMPANY = 501,
  MISSING_NAME = 502,
  MISSING_ADDRESS = 503,
  MISSING_DESCRIPTION = 504,
  CAN_NOT_UPDATE_COMPANY = 505
}

export class CanNotCreateCompany extends ServiceException {
  constructor() {
    super('Can not create company', CompanyExceptionCode.CAN_NOT_CREATE_COMPANY);
  }
}

export class MissingName extends ServiceException {
  constructor() {
    super('Missing company name', CompanyExceptionCode.MISSING_NAME);
  }
}

export class MissingAddress extends ServiceException {
  constructor() {
    super('Missing company address', CompanyExceptionCode.MISSING_ADDRESS);
  }
}

export class MissingDescription extends ServiceException {
  constructor() {
    super('Missing company description', CompanyExceptionCode.MISSING_DESCRIPTION);
  }
}

export class CanNotUpdateCompany extends ServiceException {
  constructor() {
    super('Can not update company', CompanyExceptionCode.CAN_NOT_UPDATE_COMPANY);
  }
}
