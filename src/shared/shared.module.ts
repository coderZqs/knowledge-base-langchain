// import { RedisCacheModule } from './redis/redis.module';
import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

@Global()
@Module({
  imports: [DatabaseModule /* RedisCacheModule */],
  exports: [DatabaseModule /* RedisCacheModule */],
})
export class SharedModule {}
