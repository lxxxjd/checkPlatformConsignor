import {getPreCompanyList,addPreCompany,updatePreCompany,deletePreCompany,createAccount,
  getCompanyList,addCompany,updateCompany,deleteCompany} from '@/services/company';
import {getCNASCheckFourCertCodeListInfo} from '@/services/cnas';

export default {
  namespace: 'company',
  state: {
    getPreCompanyListResult:{},
    deletePreCompanyResult:{},
    addPreCompanyResult:{},
    updatePreCompanyResult:{},
    createAccountResult:{},
    getCompanyListResult:{},addCompanyResult:{},updateCompanyResult:{},deleteCompanyResult:{},

    getCNASCheckFourCertCodeListInfoResult:{},
    getCNASLevelFourListResult:{}, // 获得四级检查项目
  },
  effects: {

    *getCNASCheckFourCertCodeListInfo({ payload,callback }, { call, put }) {
      const response = yield call(getCNASCheckFourCertCodeListInfo, payload);
      yield put({
        type: 'getCNASCheckFourCertCodeListInfoResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    *getPreCompanyList({ payload,callback }, { call, put }) {
      const response = yield call(getPreCompanyList, payload);
      yield put({
        type: 'getPreCompanyListResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    *addPreCompany({ payload,callback }, { call, put }) {
      const response = yield call(addPreCompany, payload);
      yield put({
        type: 'addPreCompanyResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *updatePreCompany({ payload,callback }, { call, put }) {
      const response = yield call(updatePreCompany, payload);
      yield put({
        type: 'updatePreCompanyResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *deletePreCompany({ payload,callback }, { call, put }) {
      const response = yield call(deletePreCompany, payload);
      yield put({
        type: 'deletePreCompanyResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *createAccount({ payload,callback }, { call, put }) {
      const response = yield call(createAccount, payload);
      yield put({
        type: 'createAccountResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    // company
    *getCompanyList({ payload,callback }, { call, put }) {
      const response = yield call(getCompanyList, payload);
      yield put({
        type: 'getCompanyListResult',
        payload: response,
      });
      if (callback) callback(response);
    },



    *addCompany({ payload,callback }, { call, put }) {
      const response = yield call(addCompany, payload);
      yield put({
        type: 'addCompanyResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *updateCompany({ payload,callback }, { call, put }) {
      const response = yield call(updateCompany, payload);
      yield put({
        type: 'updateCompanyResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *deleteCompany({ payload,callback }, { call, put }) {
      const response = yield call(deleteCompany, payload);
      yield put({
        type: 'deleteCompanyResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },








  },

  reducers: {
    getPreCompanyListResult(state, { payload }) {
      return {
        ...state,
        cargoList: payload,
      };
    },

    deletePreCompanyResult(state, { payload }) {
      return {
        ...state,
        deletePreCompanyResult: payload.data,
      };
    },

    addPreCompanyResult(state, { payload }) {
      return {
        ...state,
        addPreCompanyResult: payload.data,
      };
    },

    updatePreCompanyResult(state, { payload }) {
      return {
        ...state,
        updatePreCompanyResult: payload.data,
      };
    },

    createAccountResult(state, { payload }) {
      return {
        ...state,
        createAccountResult: payload.data,
      };
    },

    getCompanyListResult(state, { payload }) {
      return {
        ...state,
        getCompanyListResult: payload,
      };
    },

    addCompanyResult(state, { payload }) {
      return {
        ...state,
        addCompanyResult: payload.data,
      };
    },

    updateCompanyResult(state, { payload }) {
      return {
        ...state,
        updateCompanyResult: payload.data,
      };
    },

    deleteCompanyResult(state, { payload }) {
      return {
        ...state,
        deleteCompanyResult: payload,
      };
    },

    getCNASCheckFourCertCodeListInfoResult(state, { payload }) {
      return {
        ...state,
        getCNASCheckFourCertCodeListInfoResult: payload.data,
      };
    },

  }

};
