import { createClient } from 'redis';





const redisClient = createClient({
  // url: process.env.REDIS_URL,
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  socket: {
    // host: process.env.REDIS_HOST,
    // port: parseInt(process.env.REDIS_PORT ?? '6379'),
    connectTimeout: 50000,
  },
})
const connectRedis = async () => {
  if (redisClient.isOpen) return

  try {
    await redisClient.connect()
    console.log('Redis client connect successfully')
    redisClient.set('try', 'Hello Welcome to Express with Prisma')
  } catch (error) {
    console.log(
      process.env.REDIS_HOST,
      parseInt(process.env.REDIS_PORT ?? '6379'),
      process.env.REDIS_PASSWORD,
      error
    )
    setTimeout(connectRedis, 5000)
  }
}

// ;(async () => {
//   await connectRedis()
// })()

// // If the Node process ends, close the Cache connection
// process.on('SIGINT', async () => {
//   await redisClient.disconnect()
// })
connectRedis()

export default redisClient
