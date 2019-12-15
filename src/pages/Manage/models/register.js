import { fakeRegister} from '@/services/api';
import {  sendVerify,verifyTel, getRepeatTel } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';



export default {
  namespace: 'register',

  state: {
    status: undefined,
    checkUserNameResult:{},
    verifyResult:{},   // 发送验证码
    verifyTelResult:{}, // 验证验证码
    registerPreCompanyResult:{}, // 表示注册公司


  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },


    *sendVerify({ payload,callback }, { call, put }) {
      const response = yield call(sendVerify, payload);
      yield put({
        type: 'sendVerifyResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *verifyTel({ payload,callback }, { call, put }) {
      const response = yield call(verifyTel, payload);
      yield put({
        type: 'getVerifyTelResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *getRepeatTel({ payload,callback }, { call, put }) {
      const response = yield call(getRepeatTel, payload);
      if (callback) callback(response.data);
    },



  },
  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },

    getCheckUserNameResult(state, { payload }) {
      return {
        ...state,
        checkUserNameResult: payload.data,
      };
    },
    sendVerifyResult(state, { payload }) {
      return {
        ...state,
        verifyResult: payload.data,
      };
    },


    getVerifyTelResult(state, { payload }) {
      return {
        ...state,
        verifyTelResult: payload.data,
      };
    },


    registerPreCompanyResult(state, { payload }) {
      return {
        ...state,
        registerPreCompanyResult: payload.data,
      };
    },



  },
};
