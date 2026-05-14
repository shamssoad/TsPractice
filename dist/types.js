"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJob = createJob;
function createJob(id, priority, description, func) {
    return { id, priority, description, func, timeAdded: Date.now(), retryCount: 3 };
}
