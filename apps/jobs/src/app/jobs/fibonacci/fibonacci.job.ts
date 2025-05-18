import { PulsarClient } from '@jobber-fresh/pulsar';
import { Job } from '../../decorators/job.decorator';
import { AbstractJob } from '../abstract.job';

export interface FibonacciJobInput {
  iterations: number;
}

@Job({
  name: 'Fibonacci',
  description: 'Generate Fibonacci sequence',
})
export class FibonacciJob extends AbstractJob<FibonacciJobInput> {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }

  async execute(data: FibonacciJobInput) {
    console.log('FibonacciJob executed');
    console.log(data);
  }
}
