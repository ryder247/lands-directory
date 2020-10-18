import { Injectable, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ResultException } from '../../../core/exceptions/result.exception';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'JhbGciOiJIUzI1NiIsInR5cCI6IkP',
    });
  }

  public async validate(req: any, _payload: any): Promise<any> {
    console.log(req.email);
    const isValid = await this.authService.validate(req.email);

    if (!isValid) {
      return new ResultException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return isValid;
  }
}
