import { UserService } from 'src/modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from '../../modules/auth/auth.constant';
import { BusinessException } from 'src/common/exceptions/response.exception';
import { ErrorEnum } from 'src/constants/error-code.constant';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/auth.docorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthStrategy.JWT) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    const white = ['/auth/login'];

    if ((isPublic && !token) || white.includes(request.url)) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (info && info.name === 'TokenExpiredError') {
      throw new BusinessException(ErrorEnum.TOKEN_EXPIRED);
    }

    if (err || !user) {
      throw err || new BusinessException(ErrorEnum.TOKEN_INVALID);
    }
    return user;
  }
}
