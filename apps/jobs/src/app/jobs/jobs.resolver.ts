import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JobModel } from './model/job.model';
import { JobsService } from './jobs.service';
import { ExecuteJobInput } from '../DTO/execute-job.input';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [JobModel], { name: 'jobs' })
  async getJobs() {
    return this.jobsService.getJobs();
  }

  @Mutation(() => JobModel)
  async executeJob(@Args('executeJobInput') jobs: ExecuteJobInput) {
    return this.jobsService.executeJob(jobs);
  }
}
