import { Module } from '@nestjs/common';
import { ChainService } from './chain.service';
import { ChainController } from './chain.controller';
import { ChatHistoryModule } from '../chat_history/chat_history.module';
import { ChatHistoryItemModule } from '../chat_history_item/chat_history_item.module';

@Module({
  imports: [ChatHistoryModule, ChatHistoryItemModule],
  controllers: [ChainController],
  providers: [ChainService],
})
export class ChainModule {}
