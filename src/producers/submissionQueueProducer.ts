import submissionQueue from "../queues/submissionQueue";


export default async function (payload: Record<string, unknown>) {
    await submissionQueue.add("SubmissionJob", payload);
    console.log("successfully added a new submission job");
}


/* first, BullMQ will use the existing Redis connection that was established when you created the queue (sampleQueue). This connection is managed internally by BullMQ and does not need to be established again.
**** BullMQ creates a new job object containing the following information:
       Job ID: A unique identifier for the job (can be automatically generated by BullMQ).
       Job Name: The name you provided for the job.
       Job Payload: The payload data associated with the job.
       Job Status: Initial status is usually waiting or inactive.
    Additional metadata about the job (like timestamps, priority, and job attempts) is also included.

Internally, BullMQ will likely use the Redis command LPUSH (list push) to add the job to the front of the list (queue).

Under the hood, BullMQ uses the ioredis library to send the Redis commands (like LPUSH, HSET, etc.) for storing and managing jobs.
*/