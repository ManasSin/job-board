import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginInput } from './DTO/login.input';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  async login(loginInput: LoginInput, res: Response) {
    const { email, password } = loginInput;
    const user = await this.verifyUser(email, password);

    const expires = new Date();
    expires.setMilliseconds(
      expires.getTime() +
        parseInt(this.configService.getOrThrow('JWT_EXPIRATION_MS'))
    );
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };
    const accessToken = this.jwtService.sign(tokenPayload);

    res.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') == 'production',
      expires,
    });
  }

  private async verifyUser(email: string, password: string) {
    try {
      const user = await this.userService.findOne({ email });
      if (!user) {
        throw new UnauthorizedException('no user found with this email');
      }
      const authenticate = await compare(password, user.password);
      if (!authenticate) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('email or password does not match', err);
    }
  }

  getExpires() {
    const expires = new Date();
    expires.setMilliseconds(
      expires.getTime() +
        parseInt(this.configService.getOrThrow('JWT_EXPIRATION_MS'))
    );
  }
}
