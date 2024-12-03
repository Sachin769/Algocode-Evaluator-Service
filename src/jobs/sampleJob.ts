import { Job } from "bullmq";

import { IJob } from "../types/bullMqJobDefination";

export default class SampleJob implements IJob {
    name: string;
    payload?: Record<string, unknown>;
    constructor(payload: Record<string, unknown>) {
        this.payload = payload;
        this.name = this.constructor.name;
    }

    handle = (job?:Job) => {
        console.log("handler of the Sample Job");
        if(job){
            console.log(job.name,job.data);
        }
    };

    failed = (job?: Job): void => {
        console.log("Job failed");
        if (job) {
            console.log(job.id);
        }
    };
}


/*

TypeScript requires repeating the types in both the interface and the class because the class needs to implement the contract defined by the 
interface. The interface defines the structure, while the class needs to implement the properties and methods.


Without an interface, you lose the ability to create multiple classes that follow the same contract. You cannot create multiple job classes
that all adhere to the same structure unless you manually enforce it.

***if we don't use interface then****
No Type Safety or Contract: In this case, the class can still function, but TypeScript won't enforce that the class adheres to a particular
structure. If you forget to add any property or method (e.g., handle or failed), TypeScript will not catch that as an error (unless you are
using other checks like strict mode).
*/