export class GetNewAccessTokenCommand {
  constructor(public readonly refreshToken: string, public readonly response: any) {}
}
