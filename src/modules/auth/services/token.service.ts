import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ISecurityConfig, SecurityConfig } from 'src/config/security.config';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    @Inject(SecurityConfig.KEY) private securityConfig: ISecurityConfig,
  ) {}

  async generateAccessToken(payload) {
    const p = { id: payload.id, username: payload.username };
    const accessToken = await this.jwtService.signAsync(p);
    const refreshToken = await this.jwtService.signAsync(p, {
      expiresIn: this.securityConfig.refreshExpire,
    });

    return { accessToken, refreshToken };
  }
}
