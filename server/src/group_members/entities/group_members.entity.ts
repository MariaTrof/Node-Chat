import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Groups } from '../../group/entities/group.entities';
import { Users } from 'src/users/entities/users.entity';

@Table({ tableName: 'group_members', timestamps: false })
export class GroupMembers extends Model<GroupMembers> {
  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Groups)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  groupId: number;
}
