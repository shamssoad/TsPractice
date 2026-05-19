import { createJob, Job, JobType } from "./types";
import { enqueue } from "./manager";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://wnahmlsurcdipabetokx.supabase.co";

export class QueueSDK {
  private initialized = false;
  private readonly supabaseAnonKey: string;

  constructor(private apiKey: string, supabaseAnonKey?: string) {
    this.supabaseAnonKey = supabaseAnonKey ?? process.env.SUPABASE_ANON_KEY ?? "";
    if (!this.supabaseAnonKey) {
      throw new Error("Missing SUPABASE_ANON_KEY environment variable");
    }
  }

  async init(): Promise<void> {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/validate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.supabaseAnonKey}`,
        apikey: this.supabaseAnonKey,
        "x-api-key": this.apiKey,
      },
    });

    if (!res.ok) throw new Error("Invalid API key");
    this.initialized = true;
  }

  get isInitialized(): boolean {
    return this.initialized;
  }

  enqueueJob(
    id: number,
    priority: number,
    description: string,
    jobType: JobType,
    payload?: unknown,
  ): Job {
    this.assertInitialized();
    const job = createJob(id, priority, description, jobType, payload);
    enqueue(job);
    return job;
  }

  enqueue(job: Job): void {
    this.assertInitialized();
    enqueue(job);
  }

  private assertInitialized(): void {
    if (!this.initialized) {
      throw new Error("QueueSDK must be initialized before use. Call init() first.");
    }
  }
}
