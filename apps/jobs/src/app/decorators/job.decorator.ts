import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common';
import { JobMetadata } from '../interface/job-meta.interface';

export const JOB_METADATA_KEY = 'job_meta';

export const Job = (metadata: JobMetadata) =>
  applyDecorators(SetMetadata(JOB_METADATA_KEY, metadata), Injectable());
