export class CreateJobCommand {
  constructor(
    public readonly name: string,
    public readonly skills: string[],
    public readonly company: any,
    public readonly location: string,
    public readonly salary: number,
    public readonly quantity: number,
    public readonly level: string,
    public readonly description: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly isActive: boolean,
    public readonly user: any
  ) {}
}
