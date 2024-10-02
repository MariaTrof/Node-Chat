import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: false })
export class Users extends Model<Users> {
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
    unique: true,
    allowNull: false,
  })
  user_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user_password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profile_picture: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_admin: boolean;
}
