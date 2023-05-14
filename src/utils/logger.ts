import { LoggingWinston } from '@google-cloud/logging-winston'
import winston from 'winston'

const loggingWinston = new LoggingWinston()

const logger = winston.createLogger({
  level: 'debug',
  transports: [new winston.transports.Console(), loggingWinston],
})

export default logger
