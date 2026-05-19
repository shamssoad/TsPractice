# taskflow-shams

A simple priority-based job queue in TypeScript.

## Installation

npm install taskflow-shams

## Initialization

This package now requires SDK initialization before job enqueuing.

You must provide the following environment variables before running your app:

- `QUEUE_SDK_API_KEY`
- `SUPABASE_ANON_KEY`

If initialization is not completed, the SDK will throw an error and the queue will not run.

## Usage

import { QueueSDK } from "taskflow-shams";

const sdk = new QueueSDK(
  process.env.QUEUE_SDK_API_KEY ?? "",
  process.env.SUPABASE_ANON_KEY ?? ""
);

await sdk.init();

sdk.enqueueJob(1, 2, "Low priority job", "lowPriority");
sdk.enqueueJob(6, 1, "Send analytics event", "sendAnalytics");

## API

### `new QueueSDK(apiKey, supabaseAnonKey)`
- `apiKey` — required public API key for validation
- `supabaseAnonKey` — required Supabase anon key to authenticate the validation request

### `await sdk.init()`
- Validates SDK configuration before allowing any job operations
- Throws if the API key is invalid or validation fails

### `sdk.enqueueJob(id, priority, description, jobType, payload?)`
- Enqueues a new job after successful initialization
- `jobType` values currently include: `lowPriority`, `sendAnalytics`, `reportStatistics`, `fetchUserProfile`, `cleanupTempFiles`

### `sdk.enqueue(job)`
- Enqueues an existing job object after initialization

### Legacy queue API
The package also exports the queue types and `PriorityQueue` class for lower-level queue management, but using the SDK requires `init()` first.