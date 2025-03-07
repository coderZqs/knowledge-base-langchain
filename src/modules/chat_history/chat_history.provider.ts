import ChatHistory from './entities/chat_history.entity';

export const chatHistoryProviders = [
  {
    provide: 'CHAT_HISTORY_REPOSITORY',
    useValue: ChatHistory,
  },
];
