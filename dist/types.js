"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJob = createJob;
function createJob(id, priority, description, jobType, payload) {
    return { id, priority, description, jobType, payload, timeAdded: Date.now(), retryCount: 3 };
}
