import { Job } from '../decorators/job.decorator';
import { AbstractJob } from './abstract.job';

@Job({
  name: 'Fibonacci',
  description: 'Generate Fibonacci sequence',
})
export class FibonacciJob extends AbstractJob {
  async execute() {
    console.log('FibonacciJob executed');
  }
}
