type Job = {
    id: number;
    priority: number;
    description?: string;
    func: () => Promise<JobResponse>;
    timeAdded?: number;
    retryCount?: number;
};
type JobResponse = {
    success: boolean;
    error?: Error;
};
declare function createJob(id: number, priority: number, description: string, func: () => Promise<JobResponse>): Job;
export default Job;
export { createJob };
export type { Job, JobResponse };
