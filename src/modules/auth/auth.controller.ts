import { TokenService } from './services/token.service';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
  Request,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { ValidationPipe } from 'src/common/pipes/validate.pipe';
import { ResponseInterceptor } from '../../common/interceptors/api-result.interceptor';
import { Public } from 'src/common/decorators/auth.docorator';
// import { RedisRepository } from 'src/shared/redis/redis.provider';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    // private readonly redisService: RedisRepository
  ) {}

  @UsePipes(ValidationPipe)
  @UseInterceptors(ResponseInterceptor)
  @Public()
  @Post('/login')
  async login(@Body() body: LoginDto) {
    const data = await this.authService.login(body);
    return { data };
  }

  @UsePipes(ValidationPipe)
  @UseInterceptors(ResponseInterceptor)
  @Get('/refresh-token')
  async refreshToken(@Request() req) {
    const data = await this.tokenService.generateAccessToken(req.user);
    return { data };
  }
}
