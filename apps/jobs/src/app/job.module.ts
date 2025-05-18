import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsService } from './jobs.service';
import { AUTH_PACKAGE_NAME } from 'types/proto/auth';
import { FibonacciJob } from './jobs/fibonacci/fibonacci.job';
import { JobsResolver } from './jobs.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PulsarModule } from '@jobber-fresh/pulsar';

@Module({
  imports: [
    DiscoveryModule,
    PulsarModule,
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/auth.proto'),
        },
      },
    ]),
  ],
  providers: [FibonacciJob, JobsService, JobsResolver],
  exports: [JobsService],
})
export class JobModule {}
