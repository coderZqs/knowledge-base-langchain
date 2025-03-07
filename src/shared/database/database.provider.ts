import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import ChatHistory from 'src/modules/chat_history/entities/chat_history.entity';
import ChatHistoryItem from 'src/modules/chat_history_item/entities/chat_history_item.entity';
import User from 'src/modules/user/entities/user.entity';

export const providers = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService) => {
      const sequelize = new Sequelize(configService.get('database'));
      await sequelize.addModels([ChatHistory, ChatHistoryItem, User]);

      await ChatHistoryItem.sync({ alter: true });
      await ChatHistory.sync({ alter: true });
      await User.sync({ alter: true });

      return sequelize;
    },
    inject: [ConfigService],
  },
];
