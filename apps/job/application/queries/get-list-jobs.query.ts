export class GetListJobsQuery {
  constructor(public readonly currentPage: string, public readonly limit: string, public readonly qs: any) {}
}
