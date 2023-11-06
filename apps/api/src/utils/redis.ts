import { createClient } from "redis";

import { env } from "@ttbs/env";

const redisClient = createClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
  socket: {
    connectTimeout: 50000,
  },
});
const connectRedis = async () => {
  if (redisClient.isOpen) return;

  try {
    await redisClient.connect();
    console.log("Redis client connect successfully");
    redisClient.set("try", "Hello Welcome to Express with Prisma");
  } catch (error) {
    setTimeout(connectRedis, 5000);
  }
};

// ;(async () => {
//   await connectRedis()
// })()

// // If the Node process ends, close the Cache connection
// process.on('SIGINT', async () => {
//   await redisClient.disconnect()
// })
connectRedis();

export default redisClient;
