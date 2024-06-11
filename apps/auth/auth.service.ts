import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

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
    await this.userService.updateUserRefreshToken(refreshToken, _id);
    const accessToken = await this.createAccessToken(payload);
    return {
      access_token: accessToken,
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
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
      expiresIn: this.configService.get<string>('JWT_JWT_REFRESH_TOKEN_EXPIRES_IN')
    });
  }

  async createAccessToken(payload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN')
    });
  }

  async getNewAccessToken(refreshToken: string, response: Response) {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN')
      });
      const user = await this.findUserByToken(refreshToken);
      if (!user) throw new BadRequestException('User not found');
      const { _id, name, email, role } = user;
      const payload = { sub: 'token login', iss: 'from server', _id, name, email, role };
      const newRefreshToken = await this.createRefreshToken(payload);
      const newAccessToken = await this.createAccessToken(payload);
      response.clearCookie('refresh_token');
      response.cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      });
      await this.userService.updateUserRefreshToken(newRefreshToken, _id.toString());
      return {
        access_token: newAccessToken,
        user: {
          _id,
          name,
          email,
          role
        },
        refresh_token: newRefreshToken
      };
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  async findUserByToken(refreshToken: string) {
    return this.userService.findOneByToken({ refreshToken });
  }

  async logout(user) {
    return this.userService.updateUserRefreshToken('', user._id);
  }
}
