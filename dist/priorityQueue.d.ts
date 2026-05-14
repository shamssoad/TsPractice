import Job from "./types";
/**
 * this is a min heap implementation of a priority queue.
 * the job with the highest priority (1, 2, 3, etc.) will be executed first.
 */
declare class PriorityQueues {
    private jobs;
    constructor();
    getLeftChildIndex(parentIndex: number): number;
    getRightChildIndex(parentIndex: number): number;
    getParentIndex(childIndex: number): number;
    hasLeftChild(index: number): boolean;
    hasRightChild(index: number): boolean;
    hasParent(index: number): boolean;
    getLeftChild(index: number): Job;
    getRightChild(index: number): Job;
    getParent(index: number): Job;
    swap(indexOne: number, indexTwo: number): void;
    isEmpty(): boolean;
    peek(): Job | null;
    heapifyUp(): void;
    heapifyDown(): void;
    enqueue(job: Job): void;
    dequeue(): Job | null;
    executeNext(): Promise<Job | null>;
    executeAll(): Promise<void>;
}
export default PriorityQueues;
