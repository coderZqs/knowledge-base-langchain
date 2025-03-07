import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  DataType,
  Comment,
  Default,
} from 'sequelize-typescript';

const config = {
  tableName: 'chat_history',
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
class ChatHistory extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.INTEGER })
  user_id: number;

  @Column({ type: DataType.STRING(255) })
  title: string;
}

export default ChatHistory;
