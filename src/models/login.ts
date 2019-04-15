import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { accountLogin, accountAuth, logoutAll, getPublicKey } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { setToken, getUid } from '@/utils/request';
import { reloadAuthorized } from '@/utils/Authorized';
import { ILogin } from './login';

export interface ILogin {
	status: 'error' | 'success' | 'init';
	type: 'account' | 'password' | 'none';
	// token: string;
	// tokenType: string;
	uid: number;
	currAuthority: number[];
}

//初始值
const initValue: ILogin = { status: 'init', type: 'none', uid: getUid(), currAuthority: [1, 2, 3, 4, 5, 6] }; //默认赋予全部权限

export default {
	namespace: 'login',

	state: initValue,

	effects: {
		// 带加密的登陆
		*fetchLogin({ payload }: { payload }, { call, put }) {
      yield put(routerRedux.replace('/'));
		},
	},

	reducers: {

	}
};
