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
exports.JobQueue = exports.default = void 0;
const queueSdk_1 = require("./queueSdk");
const apiKey = process.env.QUEUE_SDK_API_KEY ?? "qsdk_test_123456";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduYWhtbHN1cmNkaXBhYmV0b2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNjM2NTksImV4cCI6MjA5NDczOTY1OX0.Dt5CxXpMg826x9TCz8RF2mA-LPIo5GhCKGIv7iurid4";
if (!apiKey || !supabaseAnonKey) {
    throw new Error("Missing environment variables. Set QUEUE_SDK_API_KEY and SUPABASE_ANON_KEY before running.");
}
async function main() {
    const sdk = new queueSdk_1.QueueSDK(apiKey, supabaseAnonKey);
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
__exportStar(require("./types"), exports);
var priorityQueue_1 = require("./priorityQueue");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(priorityQueue_1).default; } });
Object.defineProperty(exports, "JobQueue", { enumerable: true, get: function () { return __importDefault(priorityQueue_1).default; } });
