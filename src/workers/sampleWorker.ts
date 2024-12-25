import { Job, Worker } from "bullmq";

import redisConnection from "../config/redisConfig";
import SampleJob from "../jobs/sampleJob";

export default function SampleWorker(queueName: string){
    new Worker(
        queueName,
        async(job:Job) => {
            if(job.name === "SampleJob"){
                console.log("enter");
                const sampleJobInstance = new SampleJob(job.data);//here we ensure whatever present in the queue shoudl follow our key value with type so that in any handle or failed function not have any issue about key
                sampleJobInstance.handle(job);
            }
        },
        {
            connection: redisConnection
        }
    );
}


/*
The Worker instance is bound to the SampleQueue (via queueName).
It establishes a connection to Redis using redisConnection

When a job arrives, the worker's processor function (async (job: Job) => {...}) is invoked.
It continuously listens to the queue (by polling or using Redis' pub/sub mechanism) for new jobs.

Now after created the instance of worker now this worker object have a responsibility whenever a specific queue redis storage have a job then process for 
job completion

Using a class like SampleJob ensures that the handle and failed methods always operate on a well-defined payload structure (job.data).
This reduces the chance of errors due to unexpected data formats.


The SampleWorker function is responsible for managing the worker setup and ensuring the correct job handler (SampleJob) is invoked.
The SampleJob class is responsible for the actual business logic of the job (e.g., handling data, processing it, managing failures).


the use of the SampleJob instance in your code reflects principles of Single Responsibility Principle (SRP) and Separation of Concerns
because this file is all about to just picking a job from the queue only not to process a job too i.e (SRP).
*/