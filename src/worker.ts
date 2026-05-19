import { parentPort } from 'worker_threads';
import type { Job, JobType, JobResponse } from './types';

const taskHandlers: Record<JobType, (payload?: unknown) => Promise<JobResponse>> = {
    lowPriority: async () => {
        console.log('Executing low priority job');
        return { success: true };
    },
    sendAnalytics: async () => {
        const success = Math.random() > 0.3;

        if (!success) {
            throw new Error('Network failed');
        }

        console.log('Analytics sent');
        return { success: true };
    },
    reportStatistics: async () => {
        let sum = 0;
        for (let i = 0; i < 1e7; i++) {
            sum += i;
        }
        console.log('Report ready:', sum);
        return { success: true };
    },
    fetchUserProfile: async () => {
        const res = await fetch('https://opsjfsief.typicode.com/todos/1*jjj');
        const data = await res.json();
        console.log('User profile loaded', data);
        return { success: true };
    },
    cleanupTempFiles: async () => {
        console.log('Cleaning temporary files...');
        return { success: true };
    },
};

parentPort?.postMessage({ state: false });

parentPort?.on('message', async (message: Job) => {
    parentPort?.postMessage({ state: true });

    const handler = taskHandlers[message.jobType];
    if (!handler) {
        parentPort?.postMessage({
            state: false,
            result: { success: false, error: new Error(`Unknown job type: ${message.jobType}`) },
        });
        return;
    }

    try {
        await handler(message.payload);
        parentPort?.postMessage({ state: false, result: { success: true } });
    } catch (error) {
        parentPort?.postMessage({ state: false, result: { success: false, error: error instanceof Error ? error : new Error('Unknown error') } });
    }
});