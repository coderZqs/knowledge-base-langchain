import { ChatHistoryService } from './../chat_history/chat_history.service';
import { Body, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { TokenService } from './services/token.service';
import { BusinessException } from 'src/common/exceptions/response.exception';
import { ErrorEnum } from 'src/constants/error-code.constant';
import { LoginDto } from './dto/auth.dto';

@Injectable()
class AuthService {
  constructor(
    private usersService: UserService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
    private readonly chatHistoryService: ChatHistoryService,
  ) {}

  async login(@Body() body: LoginDto) {
    let userInfo = {} as any;
    const data = await this.usersService.findUserByName(body.username);
    if (data) {
      const findResult = await this.usersService.findUserByPassword(body);
      if (findResult) {
        userInfo = findResult.dataValues;
      } else {
        throw new BusinessException(ErrorEnum.LOGIN_ERROR);
      }
    } else {
      const createResult = await this.usersService.createUser(body);
      userInfo = createResult.dataValues;
    }

    const payload = { username: body.username, id: userInfo.id };
    const token = await this.tokenService.generateAccessToken(payload);

    return token;
  }
}

export { AuthService };
