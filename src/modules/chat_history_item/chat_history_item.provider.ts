import ChatHistoryItem from './entities/chat_history_item.entity';

export const chatHistoryItemProviders = [
  {
    provide: 'CHAT_HISTORY_ITEM_REPOSITORY',
    useValue: ChatHistoryItem,
  },
];
