/*
 * @Description: 测试用github api
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-01-22 11:34:58
 * @LastEditors: hammercui
 * @LastEditTime: 2019-01-22 11:42:35
 */

import request from '@/utils/request';

export async function test(){
  return request("/github/users/octocat",{});
}
