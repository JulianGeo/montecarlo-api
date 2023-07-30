import { createLogger, format, transports } from "winston";

export const customLogger = createLogger({
  transports: [
    new transports.File({
      level: "warn",
      filename: "logsWarnings.log",
    }),
    new transports.File({
      level: "error",
      filename: "logsErrors.log",
    }),
  ],
  format: format.combine(format.timestamp(), format.json()),
});
