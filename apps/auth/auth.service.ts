import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { CommonUtils } from 'libs/utils/utils.common';
import { UserService } from 'apps/users/user.service';
import { UserDoesNotExist } from 'apps/auth/auth.exception';
import { IUser } from './presentation/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly commonUtils: CommonUtils,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail({ email: username });
    if (!user) throw new UserDoesNotExist();
    const isValid = this.commonUtils.isValidPassword(pass, user.password);
    if (isValid) return user;
    return null;
  }

  async login(user: IUser) {
    const { _id, username, email, role } = user;
    const payload = { sub: 'token login', iss: 'from server', _id, username, email, role };
    const refreshToken = await this.createRefreshToken(payload);
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN')
      }),
      user: {
        _id,
        username,
        email,
        role
      },
      refreshToken
    };
  }

  async createRefreshToken(payload) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      expiresIn: this.configService.get<string>('JWT_JWT_REFRESH_TOKEN_EXPIRES_IN')
    });
    return refreshToken;
  }
}
