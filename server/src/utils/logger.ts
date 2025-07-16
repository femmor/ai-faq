import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(info => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`),
        format.colorize(),
        format.errors({ stack: true })
    ),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        }),
        new transports.File({
            filename: 'logs/combined.log',
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        })
    ],
});

function logError(error: Error) {
    logger.error(error.message, { stack: error.stack });
}

function logInfo(message: string) {
    logger.info(message);
}

function logDebug(message: string) { logger.debug(message); }

export {
    logger,
    logError,
    logInfo,
    logDebug
}