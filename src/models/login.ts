
import {setAuthority} from "@/utils/authority";
import { getPageQuery } from '@/utils/utils';
// import { routerRedux } from 'dva/router';
import router from 'umi/router';
export interface Ilogin {
	uid: number;
	currentAuthority: string;
}
const initValue: Ilogin = { uid: 0, currentAuthority: null };
export default {
	namespace: 'login',
	state: initValue,
	effects: {
		//请求登陆
    *fetchLogin({ payload }, { callm, put }) {
      //登陆成功
      yield put({
        type:'setLoginSucc',
        payload:{token:"token",currentAuthority:"admin"}
      })
      const urlParams = new URL(window.location.href);
			const params = getPageQuery();
			let { redirect } = params;
			if (redirect) {
				const redirectUrlParams = new URL(redirect);
				if (redirectUrlParams.origin === urlParams.origin) {
					redirect = redirect.substr(urlParams.origin.length);
					if (redirect.startsWith('/#')) {
						redirect = redirect.substr(2);
					}
				} else {
					window.location.href = redirect;
					return;
				}
      }
      console.log("redirect",redirect);
			router.replace(!!redirect?redirect : '/');
    },
    //请求登出
    *fetchLogout({ payload }, { call, put }) {
      //登出成功
      yield put({
        type:'setLogoutSucc',
        payload:{token:null,currentAuthority:"none"}
      });
      router.replace('/login/index');
    }
	},
	reducers: {
		setLoginSucc(state, { payload }) {
      //存储登录token和身份
      setAuthority(payload.currentAuthority);
      return state;
    },
    setLogoutSucc(state, { payload }) {
      //存储登录token和身份
      setAuthority(payload.currentAuthority);
      return state;
    }
	}
};
