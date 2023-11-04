import mongoose from 'mongoose'
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from '../interfaces/error'

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(ele => {
    return {
      path: ele?.path,
      message: ele?.message,
    }
  })
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation  Error',
    errorMeesages: errors,
  }
}

export default handleValidationError
