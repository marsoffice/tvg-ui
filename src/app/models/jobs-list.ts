import { Job } from './job';
import { PagedResponse } from './paged-response';

export interface JobsList extends PagedResponse<Job> {}
