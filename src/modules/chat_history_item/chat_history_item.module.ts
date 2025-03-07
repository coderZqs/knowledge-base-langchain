import { Module } from '@nestjs/common';
import { ChatHistoryItemService } from './chat_history_item.service';
import { ChatHistoryItemController } from './chat_history_item.controller';
import { chatHistoryItemProviders } from './chat_history_item.provider';

@Module({
  controllers: [ChatHistoryItemController],
  providers: [ChatHistoryItemService, ...chatHistoryItemProviders],
  exports: [ChatHistoryItemService, ...chatHistoryItemProviders],
})
export class ChatHistoryItemModule {}
