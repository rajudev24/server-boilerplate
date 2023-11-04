/* eslint-disable no-undefined */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, Response } from 'express'
import config from '../../config'
import { errorLogger } from '../../shared/logger'
import { IGenericErrorMessage } from '../../interfaces/error'
import ApiError from '../../errors/ApiError'
import handleValidationError from '../../errors/handleValidationError'
import { ZodError } from 'zod'
import handleZodError from '../../errors/handleZodError'
import handleCastError from '../../errors/handleCastError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res) => {
  config.env == 'development'
    ? console.log(' GlobalErrorHandler', error)
    : errorLogger.error(' GlobalErrorHandler', error)

  let statusCode = 500
  let message = 'Something went wrong !'
  let errorMessages: IGenericErrorMessage[] = []

  if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMeesages
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMeesages
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMeesages
  }
  ;(res as Response).status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
}

export default globalErrorHandler
