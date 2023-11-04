import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { infoLogger, errorLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server

async function main() {
  try {
    await mongoose.connect(config.db_url as string)
    infoLogger.info('Database is connected successfully')
    server = app.listen(config.port, () => {
      infoLogger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect database', error)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

process.on('SIGTERM', () => {
  infoLogger.info('SIGTREM is recevied')
  if (server) {
    server.close()
  }
})
