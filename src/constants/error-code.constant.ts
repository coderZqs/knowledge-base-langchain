export enum ErrorEnum {
  WX_AUTH_ERROR = '10001:微信授权失败',
  NO_LOGIN = '10002:未登录',
  TOKEN_EXPIRED = '10003:token过期',
  TOKEN_INVALID = '10004:token无效',
  USER_NOT_FOUND = '10005:用户不存在',
  CANT_COLLECT = '10006:请勿重复收藏',
  CANT_CANCEL_COLLECT = '10007:您还未收藏',
  NOT_ENOUGH_POWER = '10008:余额不足',
  ALREADY_SHARE = '10009:您已分享过了',
  ALREADY_SIGN = '10009:您已签到过了',
  LOGIN_ERROR = '10010:账号密码不正确',
}
