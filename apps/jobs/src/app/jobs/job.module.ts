import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsService } from './jobs.service';
import { FibonacciJob } from './fibonacci.job';
import { JobsResolver } from './jobs.resolver';

@Module({
  imports: [DiscoveryModule],
  providers: [FibonacciJob, JobsService, JobsResolver],
  exports: [JobsService],
})
export class JobModule {}
