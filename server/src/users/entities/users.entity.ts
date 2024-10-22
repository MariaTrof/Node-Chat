import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Groups } from 'src/group/entities/group.entities'; 
import { GroupMembers } from 'src/group_members/entities/group_members.entity';
import { Messages } from 'src/message/entities/message.entities';

@Table({ tableName: 'users', timestamps: false })
export class Users extends Model<Users> {
  @ApiProperty({ description: 'ID пользователя', example: '515' })
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @ApiProperty({ description: 'Имя пользователя', example: 'user_Test' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  user_name: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'p4ssw0rd' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user_password: string;

  @ApiProperty({ description: 'Фото пользователя', example: 'photo.png' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profile_picture: string;

  @ApiProperty({ description: 'Админ статус', example: 'false' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_admin: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  hashedRT?: string;

  // Связь с сообщениями
  @HasMany(() => Messages)
  messages: Messages[];

  // Связь с группами через связующую модель GroupMembers
  @BelongsToMany(() => Groups, () => GroupMembers)
  groups: Groups[];
  isActivated: boolean;
}
