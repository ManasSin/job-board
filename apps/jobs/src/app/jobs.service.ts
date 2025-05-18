import {
  DiscoveredClassWithMeta,
  DiscoveryService,
} from '@golevelup/nestjs-discovery';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { JOB_METADATA_KEY } from './decorators/job.decorator';
import { ExecuteJobInput } from './DTO/execute-job.input';
import { JobMetadata } from './interface/job-meta.interface';
import { AbstractJob } from './jobs/abstract.job';

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
    if (!(newJob.discoveredClass.instance instanceof AbstractJob)) {
      throw new InternalServerErrorException(
        `Job ${data.name} is not an instance of AbstractJob`
      );
    }
    await newJob.discoveredClass.instance.execute({}, newJob.meta.name);
    return newJob.meta;
  }
}
