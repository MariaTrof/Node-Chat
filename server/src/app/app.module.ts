import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/users/entities/users.entity';
import { UsersModule } from 'src/users/users.module';
import { Messages } from 'src/message/entities/message.entities';
import { Groups } from 'src/group/entities/group.entities';
import { GroupMembers } from 'src/group_members/entities/group_members.entity';
import { Conferences } from 'src/conferences/entities/conf.entities';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { ATGuard } from 'src/auth/guards';
import { AuthModule } from 'src/auth/auth.module';
import { GroupsModule } from 'src/group/group.module';
import { GroupMembersModule } from 'src/group_members/group_members.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'chat_db',
      models: [Users, Messages, Groups, GroupMembers, Conferences],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    GroupsModule,
    GroupMembersModule,
    ConfigModule,
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: ATGuard,
  }],
})
export class AppModule {}
