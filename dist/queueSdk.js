"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueSDK = void 0;
const types_1 = require("./types");
const manager_1 = require("./manager");
const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://wnahmlsurcdipabetokx.supabase.co";
class QueueSDK {
    constructor(apiKey, supabaseAnonKey) {
        this.apiKey = apiKey;
        this.initialized = false;
        this.supabaseAnonKey = supabaseAnonKey ?? process.env.SUPABASE_ANON_KEY ?? "";
        if (!this.supabaseAnonKey) {
            throw new Error("Missing SUPABASE_ANON_KEY environment variable");
        }
    }
    async init() {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/validate`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.supabaseAnonKey}`,
                apikey: this.supabaseAnonKey,
                "x-api-key": this.apiKey,
            },
        });
        if (!res.ok)
            throw new Error("Invalid API key");
        this.initialized = true;
    }
    get isInitialized() {
        return this.initialized;
    }
    enqueueJob(id, priority, description, jobType, payload) {
        this.assertInitialized();
        const job = (0, types_1.createJob)(id, priority, description, jobType, payload);
        (0, manager_1.enqueue)(job);
        return job;
    }
    enqueue(job) {
        this.assertInitialized();
        (0, manager_1.enqueue)(job);
    }
    assertInitialized() {
        if (!this.initialized) {
            throw new Error("QueueSDK must be initialized before use. Call init() first.");
        }
    }
}
exports.QueueSDK = QueueSDK;
