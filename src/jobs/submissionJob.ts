import { Job } from "bullmq";

import runCpp from "../containers/runCpp";
import { IJob } from "../types/bullMqJobDefination";
import { SubmissionPayload } from "../types/submissionPayload";

export default class SubmissionJob implements IJob {
    name: string;
    payload?: Record<string, SubmissionPayload>;
    constructor(payload: Record<string, SubmissionPayload>) {
        this.payload = payload;
        this.name = this.constructor.name;
    }

    handle = async (job?: Job) => {
        // console.log("handler of the SubmissionQueue Job",job);
        if (job) {
            //one way this
            console.log(job.data);
            console.log(Object.keys(job.data)[0]);
            const key = Object.keys(job.data)[0];
            console.log(job.data[key].language);
            if(job.data[key].language === "CPP"){
                const response = await runCpp(job.data[key].queueStubCode,job.data[key].queueInputCase);
                console.log("evaluated response is",response);
            }


            // //another way this below
            // console.log(Object.keys(this.payload)[0]);
            // const key = Object.keys(this.payload)[0];
            // if(this.payload[key].language === "CPP"){
            //     runCpp(this.payload[key].queueStubCode,this.payload[key].queueInputCase)
            // }

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