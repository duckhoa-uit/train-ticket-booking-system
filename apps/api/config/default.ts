import { config as dotenv } from 'dotenv';




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

/**
 * 'error',
    'warn',
    'help',
    'data',
    'info',
    'debug',
    'prompt',
    'http',
    'verbose',
    'input',
    'silly',
*/
const config = {
  server: {
    host: 'http://localhost',
    port: 8080,
    logLevel: process.env.LOG_LEVEL ?? 'debug',
  },
  socket: {
    port: 8000,
  },
  auth: {
    bcryptRounds: 10,
    jwtSecret: 'sssecret',
    redisCacheExpiresIn: 60,
    refreshTokenExpiresIn: 60,
    accessTokenExpiresIn: 60 * 24,
    accessTokenPrivateKey: process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY,
    refreshTokenPrivateKey: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
    refreshTokenPublicKey: process.env.JWT_REFRESH_TOKEN_PUBLIC_KEY,
  },
  email: {
    mailgunApiKey: process.env.EMAIL_MAILGUN_API_KEY,
    mailgunDomain: process.env.EMAIL_MAILGUN_DOMAIN,
    fromSupport: process.env.EMAIL_FROM_SUPPORT,
    templatePath: './src/templates/emails/',
    resetPasswordUrl: process.env.RESET_PASSWORD_URL,
  },
  meta: {
    title: `${NODE_ENV} - Train Ticket Booking System`,
    version: '0.0.1',
    description: '',
  },
}

export default config