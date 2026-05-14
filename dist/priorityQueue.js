"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * this is a min heap implementation of a priority queue.
 * the job with the highest priority (1, 2, 3, etc.) will be executed first.
 */
class PriorityQueues {
    constructor() {
        this.jobs = []; // this is the actual queue of jobs
    }
    getLeftChildIndex(parentIndex) {
        return 2 * parentIndex + 1;
    }
    getRightChildIndex(parentIndex) {
        return 2 * parentIndex + 2;
    }
    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }
    hasLeftChild(index) {
        return this.getLeftChildIndex(index) < this.jobs.length;
    }
    hasRightChild(index) {
        return this.getRightChildIndex(index) < this.jobs.length;
    }
    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }
    getLeftChild(index) {
        return this.jobs[this.getLeftChildIndex(index)];
    }
    getRightChild(index) {
        return this.jobs[this.getRightChildIndex(index)];
    }
    getParent(index) {
        return this.jobs[this.getParentIndex(index)];
    }
    swap(indexOne, indexTwo) {
        const temp = this.jobs[indexOne];
        this.jobs[indexOne] = this.jobs[indexTwo];
        this.jobs[indexTwo] = temp;
    }
    isEmpty() {
        return this.jobs.length === 0;
    }
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.jobs[0];
    }
    heapifyUp() {
        let index = this.jobs.length - 1;
        while (this.hasParent(index) && this.getParent(index).priority > this.jobs[index].priority) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }
    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && this.getRightChild(index).priority < this.getLeftChild(index).priority) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            if (this.jobs[index].priority < this.jobs[smallerChildIndex].priority) {
                break;
            }
            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }
    enqueue(job) {
        this.jobs.push(job);
        this.heapifyUp();
    }
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        const job = this.jobs[0];
        this.jobs[0] = this.jobs[this.jobs.length - 1];
        this.jobs.pop();
        this.heapifyDown();
        return job;
    }
    async executeNext() {
        const job = this.dequeue();
        if (!job) {
            return null;
        }
        while (job.retryCount && job.retryCount > 0) {
            try {
                const res = await job.func();
                console.log(`Executed job ${job.id} with priority ${job.priority}`);
                if (!res.success) {
                    throw new Error("Job execution failed");
                }
                else {
                    break;
                }
            }
            catch (error) {
                job.retryCount--;
                if (job.retryCount > 0) {
                    console.warn(`Job ${job.id} failed, retrying...`);
                }
                else {
                    console.error(`Job ${job.id} failed:`, error);
                }
            }
        }
        return job;
    }
    async executeAll() {
        while (!this.isEmpty()) {
            await this.executeNext();
        }
    }
}
exports.default = PriorityQueues;
