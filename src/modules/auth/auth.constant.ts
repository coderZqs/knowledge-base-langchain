const AuthStrategy = {
  LOCAL: 'local',
  LOCAL_EMAIL: 'local_email',
  LOCAL_PHONE: 'local_phone',

  JWT: 'jwt',

  GITHUB: 'github',
  GOOGLE: 'google',
} as const;

const WX_API = 'https://api.weixin.qq.com';

export { AuthStrategy, WX_API };
