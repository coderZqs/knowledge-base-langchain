import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';

const config = {
  tableName: 'doc_records',
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
class DocRecord extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING(255) })
  url: string;

  @Column({ type: DataType.TEXT })
  content: string;
}

export default DocRecord;
