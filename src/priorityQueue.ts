import Job from "./types";

/**
 * this is a min heap implementation of a priority queue.
 * the job with the highest priority (1, 2, 3, etc.) will be executed first.
 */


class PriorityQueues {

    private jobs: Job[];
    constructor() {
        this.jobs = [];  // this is the actual queue of jobs
    }

    getLeftChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 1;
    }

    getRightChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 2;
    }

    getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    hasLeftChild(index: number): boolean {
        return this.getLeftChildIndex(index) < this.jobs.length;
    }

    hasRightChild(index: number): boolean {
        return this.getRightChildIndex(index) < this.jobs.length;
    }

    hasParent(index: number): boolean {
        return this.getParentIndex(index) >= 0;
    }

    getLeftChild(index: number): Job {
        return this.jobs[this.getLeftChildIndex(index)];
    }

    getRightChild(index: number): Job {
        return this.jobs[this.getRightChildIndex(index)];
    }

    getParent(index: number): Job {
        return this.jobs[this.getParentIndex(index)];
    }

    swap(indexOne: number, indexTwo: number): void {
        const temp = this.jobs[indexOne];
        this.jobs[indexOne] = this.jobs[indexTwo];
        this.jobs[indexTwo] = temp;
    }

    isEmpty(): boolean {
        return this.jobs.length === 0;
    }

    peek(): Job | null {
        if (this.isEmpty()) {
            return null;
        }
        return this.jobs[0];
    }

    heapifyUp(): void {
        let index = this.jobs.length - 1;
        while (this.hasParent(index) && this.getParent(index).priority > this.jobs[index].priority) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    heapifyDown(): void {
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

    enqueue(job: Job): void {
        this.jobs.push(job);
        this.heapifyUp();
    }

    dequeue(): Job | null {
        if (this.isEmpty()) {
            return null;
        }
        const job = this.jobs[0];
        this.jobs[0] = this.jobs[this.jobs.length - 1];
        this.jobs.pop();
        this.heapifyDown();
        return job;
    }

    async executeNext(): Promise<Job | null> {
        return this.dequeue();
    }

    async executeAll(): Promise<void> {
        while (!this.isEmpty()) {
            this.dequeue();
        }
    }

}


export default PriorityQueues;