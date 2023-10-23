import config from 'config'
import { config as dotenv } from 'dotenv'

import { app } from './app'

const port = config.get('server.port')

const envFile = {
  dev: '.env',
  test: '.env.test',
  prod: '.env.prod',
} as const

type Env = keyof typeof envFile
const NODE_ENV = process.env.NODE_ENV as Env

dotenv({
  path: NODE_ENV && NODE_ENV in envFile ? envFile[NODE_ENV] : `.env`,
})

// start server on { port }
app.listen(port, () => {
  console.log(`${config.get('meta.title')} is running on ${port}`)
})
