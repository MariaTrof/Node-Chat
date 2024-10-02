import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../users/entities/users.entity';
import { UsersController } from './users.controller';
//import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([Users]),
    /*   forwardRef(() => AuthModule), */
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
