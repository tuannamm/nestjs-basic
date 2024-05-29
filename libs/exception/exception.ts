import { HttpException } from '@nestjs/common';

export class ServiceException extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}
