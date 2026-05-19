import { Job, JobType } from "./types";
export declare class QueueSDK {
    private apiKey;
    private initialized;
    private readonly supabaseAnonKey;
    constructor(apiKey: string, supabaseAnonKey?: string);
    init(): Promise<void>;
    get isInitialized(): boolean;
    enqueueJob(id: number, priority: number, description: string, jobType: JobType, payload?: unknown): Job;
    enqueue(job: Job): void;
    private assertInitialized;
}
