export class CreateResumeCommand {
  constructor(
    public readonly url: string,
    public readonly company: string,
    public readonly job: string,
    public readonly user: any
  ) {}
}
