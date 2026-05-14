type Job = {
    id: number,
    priority: number,
    description?: string,
    func: () => Promise<JobResponse>;
    timeAdded?: number;
    retryCount?: number;
}


type JobResponse = {
    success: boolean;
    error?: Error;
}

function createJob(id: number, priority: number, description: string, func: () => Promise<JobResponse>): Job {
    return { id, priority, description, func, timeAdded: Date.now(), retryCount: 3 };
}


export default Job;
export { createJob };
export type { Job, JobResponse };