import Redis from "ioredis";

import serverConfig from "./serverConfig";

const redisConfig = {
    host: serverConfig.REDIS_HOST,
    port: serverConfig.REDIS_PORT,
    maxRetriesPerRequest: null
};

const redisConnection = new Redis(redisConfig); 

export default redisConnection;