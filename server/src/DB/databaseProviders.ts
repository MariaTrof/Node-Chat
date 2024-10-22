import { Sequelize } from 'sequelize-typescript';
import { Users } from '../users/entities/users.entity';
import { Messages } from 'src/message/entities/message.entities';
import { Groups } from 'src/group/entities/group.entities';
import { GroupMembers } from 'src/group_members/entities/group_members.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'chat_db',
      });
      sequelize.addModels([Users, Messages, Groups, GroupMembers]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
