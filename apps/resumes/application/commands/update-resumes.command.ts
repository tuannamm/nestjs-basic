export class UpdateResumeCommand {
  constructor(public readonly id: string, public readonly status: string, public readonly user: any) {}
}
