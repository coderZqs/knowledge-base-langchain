import { ConfigType, registerAs } from '@nestjs/config';

import { env, envNumber } from '../global/env';

export const securityRegToken = 'security';

export const SecurityConfig = registerAs(securityRegToken, () => ({
  jwtSecret: env('JWT_SECRET'),
  jwtExpire: envNumber('JWT_EXPIRE'),
  refreshSecret: env('REFRESH_TOKEN_SECRET'),
  refreshExpire: envNumber('REFRESH_TOKEN_EXPIRE'),
  WX_APPID: env('WX_APPID'),
  WX_SECRET: env('WX_SECRET'),
}));

export type ISecurityConfig = ConfigType<typeof SecurityConfig>;
