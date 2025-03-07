import { UserService } from 'src/modules/user/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../../config/index';
import { AuthStrategy } from '../../modules/auth/auth.constant';
import { BusinessException } from '../exceptions/response.exception';
import { ErrorEnum } from 'src/constants/error-code.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthStrategy.JWT) {
  constructor(
    @Inject(config.SecurityConfig.KEY) private securityConfig,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: securityConfig.jwtSecret,
    });
  }

  async validate(payload) {
    if (!payload) {
      throw new BusinessException(ErrorEnum.TOKEN_INVALID);
    }

    const user = await this.userService.findUserByName(payload.username);
    console.log('----' + user);
    if (!user) {
      throw new BusinessException(ErrorEnum.TOKEN_INVALID);
    }

    return payload;
  }
}
