import { AppConfig } from './app.config';
import { DatabaseConfig } from './database.config';
import { SecurityConfig } from './security.config';
import { RedisConfig } from './redis.config';

export * from './security.config';
export * from './database.config';
export * from './app.config';
export * from './redis.config';

export default {
  AppConfig,
  DatabaseConfig,
  SecurityConfig,
  RedisConfig
};
