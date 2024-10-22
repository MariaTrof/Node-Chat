import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ATStrategy, RTStrategy } from './strategies';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/users/entities/users.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ATStrategy, RTStrategy],
  imports: [
    forwardRef(() => UsersModule),
    SequelizeModule.forFeature([Users]),
    JwtModule.register({
     // secret: process.env.JWT_ACCESS_KEY || 'secret_key', 
    //  signOptions: { expiresIn: '15m' },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
