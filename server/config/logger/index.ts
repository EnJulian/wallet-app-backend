/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, json } = winston.format;
import morgan from 'morgan';

const Env = process.env.NODE_ENV || 'development'

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.align(),
  winston.format.json(),
  winston.format.printf((info) => {
    const { level, message, label, timestamp, stack, code } = info;

    if (level == 'error') {
      return `[${level}] [${timestamp}] ${
        code != null ? `[${code}] -> [${message}] ` : message
      } ${code == null || code >= 500 ? `$[ERR_STACK] -> ${stack} ` : ''}`;
    }

    return `[${level}] -> [${timestamp}] [${label}] ->  ${message}`;
  }),
);


// filter logs into different files 
const errorFilter = winston.format((info) => {
  return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info) => {
  return info.level === 'info' ? info : false;
});

const accessFilter = winston.format((info) => {
  return info.level === 'http' ? info : false;
});

const LogLevel: string = 'error' || 'warn' || 'info' || 'http' || 'verbose' || 'debug' || 'silly'

/**
 * creates DailyRotateFile
 *
 * @param {string} filename
 * @param {boolean} zipArchive
 * @param {string} datePattern
 * @param {string} maxSize
 * @param {string} maxFiles
 * @param {LogLevel} level
 * @param {string} logFileExtension
 * @param {winston.Logform.FormatWrap} logFilter
 */
const logTransport = (
  filename: string,
  level: typeof LogLevel,
  logFilter: winston.Logform.FormatWrap, 
  zipArchive = true,
  datePattern: string = 'YYYY-MM-DD-HH:MM',
  maxSize: string = '10m',
  maxFiles: string = '80d',
  logFileExtension: string = '.log',
  
  ) => {
  return new DailyRotateFile ({
    filename: filename,
    level: level,
    format: combine(logFilter()),
    zippedArchive: zipArchive,
    datePattern: datePattern,
    maxSize: maxSize,
    maxFiles: maxFiles,
    extension: logFileExtension,
  })
}

const infoLogRotationTransport = logTransport(
  './/logs//info',
  'info',
  infoFilter,
)


const errorLogRotationTransport = logTransport(
  './/logs//error',
  'error',
  errorFilter
  );


const accessLogRotationTransport = logTransport(
  './/logs//access',
  'http',
  accessFilter
  );

const morganLogger = winston.createLogger({
  level: 'http',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    accessLogRotationTransport,
  ],
});


export const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => morganLogger.http(message.trim()),
    },
  }
);


const loggerOptions = (env: string) => {
  let logger;
  switch (env) {
    case 'production':
      logger = winston.createLogger({
        level: 'info',
        format: logFormat,
        transports: [
          infoLogRotationTransport,
          errorLogRotationTransport
        ],
        exitOnError: false,
      });
      break;
    case 'development':
      logger = winston.createLogger({
        level: 'debug',
        format: logFormat,
        transports: [
          infoLogRotationTransport,
          errorLogRotationTransport,
          accessLogRotationTransport,
          new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
          }),
        ],
        exitOnError: false,
      });
      break;
    case 'test':
      logger = winston.createLogger({
        level: 'info',
        format: logFormat,
        transports: [
          infoLogRotationTransport,
          errorLogRotationTransport,
          accessLogRotationTransport,
          new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
          }),
        ],
        exitOnError: false,
      });
      break;
    default:
      logger = winston.createLogger({
        level: 'info',
        format: logFormat,
        transports: [
          infoLogRotationTransport,
          errorLogRotationTransport,
          accessLogRotationTransport,
          new winston.transports.Console(),
        ],
        exitOnError: false,
      });
  }

  return logger;
};

const logger = loggerOptions(Env);

export default class Logger {
  constructor(private readonly defaultContext: string) {}
  public static log(message: string | any, context?: string): void {
    logger.info(message, { label: context });
  }

  public static error(
    err: string,
    errorLog?: object | Array<unknown> | unknown,
  ): void {
    logger.error(err, errorLog);
  }

  public log(message: string | any, context?: string) {
    logger.info(message, { label: context ?? this.defaultContext });
  }

  public error(
    err: string,
    errorLog?: object | Array<unknown> | unknown,
  ): void {
    logger.error(err, errorLog);
  }

  public static info(
    message: string,
    context?: string | object | Array<unknown>,
  ): void {
    logger.info(message, context);
  }
  public static debug(
    message: string,
    context?: string | object | Array<unknown>,
  ): void {
    logger.debug(message, context);
  }
  public static warn(
    message: string,
    context?: string | object | Array<unknown>,
  ): void {
    logger.warn(message, context);
  }

  public static http(
    message: string,
    context?: string | object | Array<unknown>,
  ): void {
    logger.http(message, context);
  }

  public info(message: string, context?: string | object | Array<unknown>) {
    logger.info(message, context ?? this.defaultContext);
  }

  public debug(
    message: string,
    context?: string | object | Array<unknown>,
  ): void {
    logger.debug(message, context);
  }

  public warn(
    message: string,
    context?: string | object | Array<unknown>,
  ): void {
    logger.warn(message, context);
  }

  public http(message: string, context?: string | object | Array<unknown>) {
    logger.http(message, context ?? this.defaultContext);
  }
}


