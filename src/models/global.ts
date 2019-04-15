export interface Iglobal{
    collapsed: boolean,
    isMobile:boolean,
    notices: [],
    serverEnv:string,
    playerId: number;
}

let intGlobal:Iglobal =  {
  collapsed: false,
  isMobile:false,
  notices: [],
  serverEnv:null,
  playerId:-1
}
export default {
  namespace: 'global',

  state:intGlobal,

  effects: {
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
    // 更新是否是手机
    setMobile(state,{payload}){
      return {
        ...state,
        isMobile: payload.isMobile,
      };
    },
    //设置服务器环境
    setServerEnv(state,{payload}){
      return {...state,serverEnv:payload}
    },
    //设置全局相同playerId
    setPlayerId(state,{payload}):Iglobal{
      return {...state,playerId:payload}
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window['ga'] !== 'undefined') {
          window['ga']('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
