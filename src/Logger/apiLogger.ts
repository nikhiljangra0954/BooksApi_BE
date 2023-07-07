const winston = require("winston");
const { createLogger, format, transports } = require("winston");

const logConfiguration = {
  transports: [
    new transports.File({
      filename: "logs/error.log",
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
      filename: "logs/info.log",
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
      filename: "logs/warn.log",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info: { level: any; timestamp: any; message: any }) =>
            `${info.level}: ${[info.timestamp]}: ${info.message}`
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
