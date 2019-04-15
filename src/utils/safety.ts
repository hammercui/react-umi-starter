/*
 * @Description:安全模块-非对称加密
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2018-12-29 16:56:53
 * @LastEditors: hammercui
 * @LastEditTime: 2018-12-29 17:00:51
 */
import { JSEncrypt } from './jsencrypt';

/**
 * @name:加密信息
 * @msg:
 * @param {type}
 * @return:
 */
export function encryptStr(pubKey: string, source: string): string {
	let encrypt = new JSEncrypt({});
	encrypt.setPublicKey(pubKey);
	const encryptKey = encrypt.encrypt(source); //使用公钥加密，得到密文
  if(!encryptKey) return '';
	return encryptKey;
}
