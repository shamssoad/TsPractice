import PriorityQueues from "./priorityQueue";
import Job, { createJob, JobResponse } from "./types";

// const pq = new PriorityQueues();

// pq.enqueue(
//   createJob(1, 2, "Low priority job", async (): Promise<JobResponse> => {
//     console.log("Executing low priority job");
//     return { success: true};
//   })
// );

// pq.enqueue(createJob(6, 1, "Send analytics event", async (): Promise<JobResponse> => {
//   const success = Math.random() > 0.3;

//   if (!success) {
//     throw new Error("Network failed");
//   }
//   console.log("Analytics sent");
//   return { success: true };
// }));

// pq.enqueue(createJob(5, 2, "Calculate report statistics", async (): Promise<JobResponse> => {
//   let sum = 0;

//   for (let i = 0; i < 1e7; i++) {
//     sum += i;
//   }

//   console.log("Report ready:", sum);
//   return { success: true };
// }));

// pq.enqueue(createJob(3, 1, "Fetch user profile", async (): Promise<JobResponse> => {
//   const res = await fetch("https://opsjfsief.typicode.com/todos/1*jjj");
//   const data = await res.json();
//   console.log("User profile loaded", data);
//   return { success: true };
// }));

// pq.enqueue(createJob(4, 3, "Cleanup temp files", async (): Promise<JobResponse> => {
//   console.log("Cleaning temporary files...");
//   return { success: true };
// }));

// (async () => {
//   console.log("Starting job execution by dequeuing jobs...");
//   await pq.executeAll();
//   console.log("All jobs finished");
// })();


export * from "./types";
export { default, default as PriorityQueues } from "./priorityQueue";