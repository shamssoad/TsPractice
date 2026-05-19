import { Worker } from "node:worker_threads";

type JobType =
    | "lowPriority"
    | "sendAnalytics"
    | "reportStatistics"
    | "fetchUserProfile"
    | "cleanupTempFiles";

type Job = {
    id: number;
    priority: number;
    description?: string;
    jobType: JobType;
    payload?: unknown;
    timeAdded?: number;
    retryCount?: number;
};

type JobResponse = {
    success: boolean;
    error?: Error;
};

function createJob(
    id: number,
    priority: number,
    description: string,
    jobType: JobType,
    payload?: unknown,
): Job {
    return { id, priority, description, jobType, payload, timeAdded: Date.now(), retryCount: 3 };
}

type workerInfo = {
    workerId: number;
    worker: Worker;
    state: boolean;
};

export default Job;
export { createJob };
export type { Job, JobType, JobResponse, workerInfo };