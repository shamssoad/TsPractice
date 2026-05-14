# taskflow-shams

A simple priority-based job queue in TypeScript.

## Installation

npm install taskflow-shams

## Usage

import PriorityQueue, { createJob, JobResponse } from "taskflow-shams";

const pq = new PriorityQueue();

pq.enqueue(createJob(1, 2, "my job", async (): Promise<JobResponse> => {
    console.log("job running!");
    return { success: true };
}));

await pq.executeAll();

## API

### `createJob(id, priority, description, func)`
- `id` — unique job identifier
- `priority` — lower number = higher priority
- `description` — human readable label
- `func` — async function to execute

### `pq.enqueue(job)` — add a job to the queue
### `pq.dequeue()` — remove and return highest priority job
### `pq.executeAll()` — run all jobs in priority order
### `pq.executeNext()` — run the next job only
### `pq.peek()` — see the next job without removing it
### `pq.isEmpty()` — check if queue is empty