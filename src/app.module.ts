import { Module } from '@nestjs/common';
import { ChainModule } from './modules/chain/chain.module';
import config from './config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { ChatHistoryModule } from './modules/chat_history/chat_history.module';
import { DocsModule } from './modules/docs/docs.module';
import { ChatHistoryItemModule } from './modules/chat_history_item/chat_history_item.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // 指定多个 env 文件时，第一个优先级最高
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [...Object.values(config)],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public/uploads'),
      serveRoot: '/uploads/',
    }),
    ChainModule,
    UserModule,
    ChatHistoryModule,
    AuthModule,
    DocsModule,
    SharedModule,
    ChatHistoryItemModule,
  ],

  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }, JwtStrategy],
})
export class AppModule {}
