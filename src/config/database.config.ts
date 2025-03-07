import { registerAs } from '@nestjs/config';
import { env, envBoolean, envNumber } from '../global/env';

export const DatabaseConfig = registerAs('database', () => {
  return {
    dialect: 'mysql',
    host: env('DB_HOST', 'localhost'),
    port: envNumber('DB_PORT', 3306),
    username: env('DB_USERNAME'),
    password: env('DB_PASSWORD'),
    database: env('DB_DATABASE'),
    synchronize: envBoolean('DB_SYNCHRONIZE', false),
    timezone: '+08:00',
  };
});
