import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  AutoIncrement,
  PrimaryKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Groups } from 'src/group/entities/group.entities';
import { Users } from 'src/users/entities/users.entity';

@Table({ tableName: 'messages', timestamps: true }) //сохраняем время в createdAt и т.д.
export class Messages extends Model<Messages> {
  @ApiProperty({ description: 'ID сообщения', example: '1' })
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @ApiProperty({ description: 'ID отправителя', example: '1' })
  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  senderId: number;

  @ApiProperty({ description: 'ID группы', example: '1' })
  @ForeignKey(() => Groups)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  groupId: number;

  @ApiProperty({ description: 'Содержимое сообщения', example: 'Hello!' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @BelongsTo(() => Users)
  sender: Users;

  @BelongsTo(() => Groups)
  group: Groups;
}
