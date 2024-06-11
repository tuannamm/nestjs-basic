import { Response } from 'express';

export class LoginCommand {
  constructor(public readonly user: any, public readonly response: any) {}
}
