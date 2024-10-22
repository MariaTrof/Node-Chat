import {
  Column,
  Table,
  Model,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';
import { Groups } from 'src/group/entities/group.entities';

@Table({ tableName: 'conferences' })
export class Conferences extends Model<Conferences> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ForeignKey(() => Groups)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  groupId: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startTime: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endTime: Date;
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: Date;
}
