import { createLogger, format, transports } from 'winston';
import moment from 'moment-timezone';
const { combine, printf, label } = format;
// Caracas timezone timestamp
const timestamp = format(info => {
    info.timestamp = moment()
        .tz('America/Caracas')
        .format('YYYY-MM-DD HH:mm:ss');
    return info;
});
// Custom log format with uppercase level
const logFormat = printf(({ level, message, timestamp, label }) => {
    return `${timestamp} ${level.toUpperCase()} - ${label}: ${message}`;
});
// Create logger
export const logger = createLogger({
    level: 'debug',
    format: combine(label({ label: 'gateway' }), timestamp(), logFormat),
    transports: [
        new transports.Console({
            level: 'debug',
            format: combine(label({ label: 'gateway' }), timestamp(), logFormat),
        }),
        new transports.File({
            filename: './src/logs/log.log',
            level: 'info',
            format: combine(label({ label: 'gateway' }), timestamp(), logFormat),
        }),
    ],
});
//# sourceMappingURL=logger.js.map