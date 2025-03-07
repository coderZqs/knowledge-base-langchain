import { ChatHistoryService } from './../chat_history/chat_history.service';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { TokenService } from './services/token.service';
import { ChatHistoryModule } from '../chat_history/chat_history.module';

// import { RedisCacheModule } from '../../shared/redis/redis.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ChatHistoryModule,
    // RedisCacheModule,
    JwtModule.registerAsync({
      // 注入 ConfigService，这样它可以在 useFactory 中使用。
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => {
        const { jwtSecret, jwtExpire } = configService.get('security');
        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: `${jwtExpire}s`,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [ConfigService, AuthService, TokenService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
