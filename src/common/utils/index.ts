import { RESPONSE_CODE, RESPONSE_MSG } from '../enums/index';

/**
 * @description: 统一返回体
 */

export const responseMessage = (
  data: any,
  msg: string = RESPONSE_MSG.SUCCESS,
  code: number = RESPONSE_CODE.SUCCESS,
) => ({ data, msg, code });

//  处理参数
export const formatParams = (rules) => {
  const filterRules = rules.filter((v) => {
    if (v.op !== 'between' && v.op !== 'date') {
      return Boolean(v.value);
    } else {
      return Array.isArray(v.value) && v.value.filter((t) => Boolean(t)).length;
    }
  });

  return filterRules;
};