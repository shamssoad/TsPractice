import { Worker } from "node:worker_threads";
import {Job, workerInfo} from "./types";
import path from "path";
import os from "node:os";
import PriorityQueues from "./priorityQueue";

const MAX_WORKERS = 4;
const workerCount = Math.min(os.availableParallelism(), MAX_WORKERS);

const workerPool: workerInfo[] = [];
const jobQueue = new PriorityQueues();

function createWorker(id: number): workerInfo {
    const workerPath = path.resolve(__dirname, "worker.js");
    const worker = new Worker(workerPath);

    const info: workerInfo = {
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

function replaceWorker(dead: workerInfo) {
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

function getAvailableWorker(): workerInfo | null {
    return workerPool.find((w) => w.state === false) ?? null;
}

function drain(): void {
    while (!jobQueue.isEmpty()) {
        const worker = getAvailableWorker();
        if (!worker) return;

        const job = jobQueue.dequeue();
        if (!job) return;

        worker.state = true;
        worker.worker.postMessage(job);
    }
}

export function enqueue(job: Job): void {
    jobQueue.enqueue(job);
    drain();
}

createWorkerPool();