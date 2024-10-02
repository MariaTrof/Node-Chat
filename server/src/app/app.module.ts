import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/users/entities/users.entity';
import { databaseProviders } from 'src/DB/databaseProviders';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'chat_db',
      models: [Users],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
  ],
  providers: [
    ...databaseProviders,
    //  {
    //    provide: 'USERS_REPOSITORY',
    //    useValue: Users,
    //  },
  ],
})
export class AppModule {}
