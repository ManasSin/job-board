import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JobModel } from './model/job.model';
import { JobsService } from './jobs.service';
import { ExecuteJobInput } from '../DTO/execute-job.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@jobber-fresh/nestjs';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [JobModel], { name: 'jobs' })
  @UseGuards(GqlAuthGuard)
  async getJobs() {
    return this.jobsService.getJobs();
  }

  @Mutation(() => JobModel)
  async executeJob(@Args('executeJobInput') jobs: ExecuteJobInput) {
    return this.jobsService.executeJob(jobs);
  }
}
