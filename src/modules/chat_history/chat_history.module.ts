import { Module } from '@nestjs/common';
import { ChatHistoryService } from './chat_history.service';
import { ChatHistoryController } from './chat_history.controller';
import { chatHistoryProviders } from './chat_history.provider';

@Module({
  controllers: [ChatHistoryController],
  providers: [ChatHistoryService, ...chatHistoryProviders],
  exports: [ChatHistoryService, ...chatHistoryProviders],
})
export class ChatHistoryModule {}
