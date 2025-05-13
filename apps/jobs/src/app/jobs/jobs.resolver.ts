import { Query, Resolver } from '@nestjs/graphql';
import { JobModel } from './model/job.model';
import { JobsService } from './jobs.service';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [JobModel], { name: 'jobs' })
  async getJobs() {
    // return this.jobsService.getJobs()
  }
}
