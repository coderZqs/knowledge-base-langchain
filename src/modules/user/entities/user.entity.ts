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
  tableName: 'users',
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
class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING(255) })
  username: string;

  @Column({ type: DataType.STRING(255) })
  password: string;
}

export default User;
