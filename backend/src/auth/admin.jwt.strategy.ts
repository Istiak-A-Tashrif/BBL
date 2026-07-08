import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Algorithm } from 'jsonwebtoken';
import { ConfigService } from 'src/config/config.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: (req: { cookies: { [x: string]: any } }) =>
        req.cookies['admin_access_token'],
      secretOrKey: configService.jwtSecret,
      algorithms: [configService.jwtAlgorithm as Algorithm],
    });
  }

  async validate(payload: JwtPayload) {
    const { sub, email } = payload;

    if (sub !== 1 || email !== this.configService.adminEmail) {
      throw new Error('Admin not found');
    }

    return {
      id: 1,
      email,
      name: this.configService.adminName,
      permissions: ['cms'],
      role: 'admin',
    };
  }
}
