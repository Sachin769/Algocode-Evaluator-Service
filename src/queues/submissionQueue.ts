import { Queue } from "bullmq";

import redisConnection from "../config/redisConfig";

export default new Queue("SubmissionQueue",{
    connection: redisConnection
});

/* At that point, BullMQ initializes the connection to Redis in the background using the ioredis library.
When you create a new instance of Queue, BullMQ calls ioredis.connect() to establish a connection to Redis.
Redis commands are sent to the Redis server in the background by BullMQ using ioredis.
*/