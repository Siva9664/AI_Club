import pino from 'pino';
import { env, isTest } from '../config/env';

/**
 * Application logger. Pretty output in development, JSON everywhere else.
 * Silenced during tests to keep the output readable.
 */
export const logger = pino({
  level: isTest ? 'silent' : env.NODE_ENV === 'development' ? 'debug' : 'info',
  transport:
    env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: { colorize: true, translateTime: 'HH:MM:ss', ignore: 'pid,hostname' },
        }
      : undefined,
});
