"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueues = exports.default = void 0;
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
__exportStar(require("./types"), exports);
var priorityQueue_1 = require("./priorityQueue");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(priorityQueue_1).default; } });
Object.defineProperty(exports, "PriorityQueues", { enumerable: true, get: function () { return __importDefault(priorityQueue_1).default; } });
