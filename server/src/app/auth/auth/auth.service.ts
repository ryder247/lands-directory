import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as crypto from 'crypto';
import { ResultException } from '../../../core/exceptions/result.exception';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validate(email): Promise<User> {
    const user = await this.userService.getByEmail(email);
    return user ? user : null;
  }

  public async validateUser(userData: {
    email: string;
    password: string;
  }): Promise<User> {
    const user = await this.userService.getByEmail(userData.email);
    userData.password = crypto
      .createHmac('sha256', userData.password)
      .digest('hex');
    return user.password == userData.password ? user : undefined;
  }

  public async login(user: { email: string; password: string }): Promise<any> {
    return this.validateUser(user).then(userData => {
      if (!userData) {
        throw new ResultException(
          'Unable to login with provided credentials',
          HttpStatus.BAD_REQUEST,
        );
      }
      delete userData.password;
      const accessToken = this.jwtService.sign({ ...userData });
      return {
        access_token: accessToken,
        data: userData,
      };
    });
  }

  public async register(user: User): Promise<any> {
    const userData = await this.userService.getByEmail(user.email);
    if (userData != null) {
      throw new ResultException(
        'User with email already exists',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      user.password = crypto.createHmac('sha256', user.password).digest('hex');
      return this.userService.create(user);
    }
  }
}
