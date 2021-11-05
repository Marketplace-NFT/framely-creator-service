import winston from 'winston';
import { FileTransportInstance } from 'winston/lib/winston/transports';
import config from '../config';

// Transports with LOG_FILE
let transportFiles: FileTransportInstance[] = [];
if (config.USE_LOG_FILE) {
  transportFiles = [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ];
}

export const loggerConfig = {
  transports: [new winston.transports.Console(), ...transportFiles],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize(),
    winston.format.printf((info) => `${info.timestamp} ${info.level}:${info.message}`),
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).}
};

const logger = winston.createLogger(loggerConfig);
export default logger;
