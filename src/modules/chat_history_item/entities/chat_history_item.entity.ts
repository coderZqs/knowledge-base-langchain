import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  Comment,
} from 'sequelize-typescript';

const config = {
  tableName: 'chat_history_item',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [{ name: 'id' }],
    },
  ],
} as any;

@Table(config)
class ChatHistoryItem extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.TEXT })
  content: number;

  @Column({ type: DataType.TEXT })
  type: number;

  @Column({ type: DataType.INTEGER })
  chat_history_id: number;
}

export default ChatHistoryItem;
