import { Request, Response, Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import { swaggerSpec } from '@/utils/swagger'
import { authRouter } from './auth.router'
import { userRouter } from './user.router'

export const indexRouter = Router()

indexRouter.use('/users', userRouter)
indexRouter.use('/auth', authRouter)

indexRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Docs in JSON format
indexRouter.get('/docs.json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})
