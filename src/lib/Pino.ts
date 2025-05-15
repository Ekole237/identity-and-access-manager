import {pino, type Logger} from 'pino'
import * as process from 'node:process'

export const logger: Logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
  level: process.env.PINO_LOG_LEVEL || 'info',

  redact: [], // prevent logging sensitive data
})