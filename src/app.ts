import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()
app.use(cors())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
// app.use('/api/v1/')

// Global Error Handler
app.use(globalErrorHandler)

// Handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  })
  next()
})

app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully')
})

export default app
