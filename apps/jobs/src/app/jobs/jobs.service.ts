import {
  DiscoveredClassWithMeta,
  DiscoveryService,
} from '@golevelup/nestjs-discovery';
import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { JOB_METADATA_KEY } from '../decorators/job.decorator';
import { ExecuteJobInput } from '../DTO/execute-job.input';
import { JobMetadata } from '../interface/job-meta.interface';
import { AbstractJob } from './abstract.job';

@Injectable()
export class JobsService implements OnModuleInit {
  private jobs: DiscoveredClassWithMeta<JobMetadata>[] = [];
  constructor(private readonly discoveryService: DiscoveryService) {}

  async onModuleInit() {
    this.jobs = await this.discoveryService.providersWithMetaAtKey<JobMetadata>(
      JOB_METADATA_KEY
    );
    console.log(this.jobs);
  }

  getJobs() {
    return this.jobs.map((job) => job.meta);
  }

  async executeJob(data: ExecuteJobInput) {
    const newJob = this.jobs.find((job) => job.meta.name === data.name);
    if (!newJob) {
      throw new BadRequestException(`Job ${data.name} doesn't exists`);
    }
    await (newJob.discoveredClass.instance as AbstractJob).execute();
    return newJob.meta;
  }
}
