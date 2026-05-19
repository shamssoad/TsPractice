import { createJob } from "./types";
import { enqueue } from "./manager";
import { QueueSDK } from "./queueSdk";

const apiKey = process.env.QUEUE_SDK_API_KEY ?? "qsdk_test_123456";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduYWhtbHN1cmNkaXBhYmV0b2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNjM2NTksImV4cCI6MjA5NDczOTY1OX0.Dt5CxXpMg826x9TCz8RF2mA-LPIo5GhCKGIv7iurid4";

if (!apiKey || !supabaseAnonKey) {
  throw new Error(
    "Missing environment variables. Set QUEUE_SDK_API_KEY and SUPABASE_ANON_KEY before running."
  );
}

async function main(): Promise<void> {
  const sdk = new QueueSDK(apiKey, supabaseAnonKey);
  await sdk.init();

  console.log("Job Manager initialized. Enqueuing jobs...");

  sdk.enqueueJob(1, 2, "Low priority job", "lowPriority");
  sdk.enqueueJob(6, 1, "Send analytics event", "sendAnalytics");
  sdk.enqueueJob(5, 2, "Calculate report statistics", "reportStatistics");
  sdk.enqueueJob(3, 1, "Fetch user profile", "fetchUserProfile");
  sdk.enqueueJob(4, 3, "Cleanup temp files", "cleanupTempFiles");

  console.log("Jobs enqueued. Waiting for execution...");
}

main().catch((error) => {
  console.error("Failed to initialize SDK or enqueue jobs:", error);
  process.exit(1);
});

export * from "./types";
export { default, default as JobQueue } from "./priorityQueue";
