import { pino, type Logger } from "pino";

export const logger: Logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
  level:
    typeof process !== "undefined" && process.env.PINO_LOG_LEVEL
      ? process.env.PINO_LOG_LEVEL
      : "info",

  redact: [], // prevent logging sensitive data
});
