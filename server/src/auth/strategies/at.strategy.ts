import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';

interface JwtPayload {
  sub: number;
  user_name: string;
}

@Injectable()
export class ATStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_KEY,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
