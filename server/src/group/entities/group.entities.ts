import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  BelongsToMany,
  DataType,
} from 'sequelize-typescript';
import { Users } from 'src/users/entities/users.entity';
import { GroupMembers } from '../../group_members/entities/group_members.entity'; // Связывающая модель

@Table({ tableName: 'groups', timestamps: false })
export class Groups extends Model<Groups> {
  @ApiProperty({ description: 'ID группы', example: '1' })
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @ApiProperty({ description: 'Название группы', example: 'My Group' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Users, () => GroupMembers)
  members: Users[];
}
