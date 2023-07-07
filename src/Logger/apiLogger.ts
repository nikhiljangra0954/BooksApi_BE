const winston = require("winston");
const { createLogger, format, transports } = require("winston");

const logConfiguration = {
  transports: [
    new transports.File({
      filename: "logs/combine.log",
      level: "error",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (error: { level: any; timestamp: any; message: any }) =>
            `${error.level}: ${[error.timestamp]}: ${error.message}`
        )
      ),
    }),
    new transports.File({
      filename: "logs/combine.log",
      level : "info",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info: { level: any; timestamp: any; message: any }) =>
            `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
    new transports.File({
      filename: "logs/combine.log",
      level : "warn",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (warn: { level: any; timestamp: any; message: any }) =>
            `${warn.level}: ${[warn.timestamp]}: ${warn.message}`
        )
      ),
    }),
  ],
};

const logger = winston.createLogger(logConfiguration);

// Log a message
module.exports = {
  logger,
};
