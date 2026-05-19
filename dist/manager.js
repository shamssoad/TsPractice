"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enqueue = enqueue;
const node_worker_threads_1 = require("node:worker_threads");
const path_1 = __importDefault(require("path"));
const node_os_1 = __importDefault(require("node:os"));
const priorityQueue_1 = __importDefault(require("./priorityQueue"));
const MAX_WORKERS = 4;
const workerCount = Math.min(node_os_1.default.availableParallelism(), MAX_WORKERS);
const workerPool = [];
const jobQueue = new priorityQueue_1.default();
function createWorker(id) {
    const workerPath = path_1.default.resolve(__dirname, "worker.js");
    const worker = new node_worker_threads_1.Worker(workerPath);
    const info = {
        workerId: id,
        worker,
        state: false,
    };
    worker.on("message", () => {
        info.state = false;
        drain();
    });
    worker.on("error", (err) => {
        console.error(`Worker ${id} error:`, err);
        info.state = false;
        replaceWorker(info);
        drain();
    });
    worker.on("exit", (code) => {
        if (code !== 0) {
            console.warn(`Worker ${id} exited with code ${code}, replacing...`);
            replaceWorker(info);
        }
    });
    return info;
}
function replaceWorker(dead) {
    const index = workerPool.indexOf(dead);
    if (index !== -1) {
        workerPool[index] = createWorker(dead.workerId);
    }
}
function createWorkerPool() {
    for (let i = 0; i < workerCount; i++) {
        workerPool.push(createWorker(i));
    }
}
function getAvailableWorker() {
    return workerPool.find((w) => w.state === false) ?? null;
}
function drain() {
    while (!jobQueue.isEmpty()) {
        const worker = getAvailableWorker();
        if (!worker)
            return;
        const job = jobQueue.dequeue();
        if (!job)
            return;
        worker.state = true;
        worker.worker.postMessage(job);
    }
}
function enqueue(job) {
    jobQueue.enqueue(job);
    drain();
}
createWorkerPool();
