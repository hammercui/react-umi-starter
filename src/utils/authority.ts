let uid: number = Number(localStorage.getItem('mega-manager-uid'));
let access_token: string = localStorage.getItem('mega-manager-token');
let access_tokenType = 'Bearer';

/**
 * @name: 存储token
 * @msg:
 * @param {type}
 * @return:
 */
export const setToken = (tokenInfo) => {
	uid = tokenInfo.uid;
	access_token = tokenInfo.token;
	access_tokenType = tokenInfo.tokenType;
	//存储local
	localStorage.setItem('mega-manager-uid', String(uid));
	localStorage.setItem('mega-manager-token', access_token);
};


/**
 * @name: 获得权限文本
 * @msg: use localStorage to store the authority info, which might be sent from server in actual project.
 * @param {type}
 * @return:
 */
export function getAuthority(str) {
	// return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
	const authorityString = typeof str === 'undefined' ? localStorage.getItem('mega-authority') : str;
	// authorityString could be admin, "admin", ["admin"]
	let authority;
	try {
		authority = JSON.parse(authorityString);
	} catch (e) {
		authority = authorityString;
	}
	if (typeof authority === 'string') {
		return [authority];
	}

	return authority || ['admin'];
}

/**
 * @name: 存储权限文本
 * @msg:
 * @param {type}
 * @return:
 */
export function setAuthority(authority) {
	const proAuthority = typeof authority === 'string' ? [authority] : authority;
	return localStorage.setItem('mega-authority', JSON.stringify(proAuthority));
}
