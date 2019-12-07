import {getCNASLevelOneList,addCNASLevelOne,updateCNASLevelOne,deleteCNASLevelOne,
  getCNASLevelTwoList,addCNASLevelTwo,updateCNASLevelTwo,deleteCNASLevelTwo,
  getCNASLevelThreeList,addCNASLevelThree,updateCNASLevelThree,deleteCNASLevelThree,
  getCNASLevelFourList,addCNASLevelFour,updateCNASLevelFour,deleteCNASLevelFour,getCnasLevelInfo,
  handleCNASCheckFourCertCode,

} from '@/services/cnas';

export default {
  namespace: 'cnasinfo',
  state: {
    getCNASLevelOneListResult:{},addCNASLevelOneResult:{},updateCNASLevelOneResult:{},deleteCNASLevelOneResult:{},
    getCNASLevelTwoListResult:{},addCNASLevelTwoResult:{},updateCNASLevelTwoResult:{},deleteCNASLevelTwoResult:{},
    getCNASLevelThreeListResult:{},addCNASLevelThreeResult:{},updateCNASLevelThreeResult:{},deleteCNASLevelThreeResult:{},
    getCNASLevelFourListResult:{},addCNASLevelFourResult:{},updateCNASLevelFourResult:{},deleteCNASLevelFourResult:{},
    getCnasLevelInfoResult:{}, // cnas分类树
    handleCNASCheckFourCertCodeResult:{},

  },
  effects: {

    // 增删改 统一处理 CNAS检查项目

    *handleCNASCheckFourCertCode({ payload,callback }, { call, put }) {
      const response = yield call(handleCNASCheckFourCertCode, payload);
      yield put({
        type: 'handleCNASCheckFourCertCodeResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *getCNASLevelOneList({ payload,callback }, { call, put }) {
      const response = yield call(getCNASLevelOneList, payload);
      yield put({
        type: 'getCNASLevelOneListResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    *addCNASLevelOne({ payload,callback }, { call, put }) {
      const response = yield call(addCNASLevelOne, payload);
      yield put({
        type: 'addCNASLevelOneResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *updateCNASLevelOne({ payload,callback }, { call, put }) {
      const response = yield call(updateCNASLevelOne, payload);
      yield put({
        type: 'updateCNASLevelOneResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *deleteCNASLevelOne({ payload,callback }, { call, put }) {
      const response = yield call(deleteCNASLevelOne, payload);
      yield put({
        type: 'deleteCNASLevelOneResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    // 二级分类
    *getCNASLevelTwoList({ payload,callback }, { call, put }) {
      const response = yield call(getCNASLevelTwoList, payload);
      yield put({
        type: 'getCNASLevelTwoListResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    *addCNASLevelTwo({ payload,callback }, { call, put }) {
      const response = yield call(addCNASLevelTwo, payload);
      yield put({
        type: 'addCNASLevelTwoResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *updateCNASLevelTwo({ payload,callback }, { call, put }) {
      const response = yield call(updateCNASLevelTwo, payload);
      yield put({
        type: 'updateCNASLevelTwoResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *deleteCNASLevelTwo({ payload,callback }, { call, put }) {
      const response = yield call(deleteCNASLevelTwo, payload);
      yield put({
        type: 'deleteCNASLevelTwoResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    // 三级分类


    *getCNASLevelThreeList({ payload,callback }, { call, put }) {
      const response = yield call(getCNASLevelThreeList, payload);
      yield put({
        type: 'getCNASLevelThreeListResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    *addCNASLevelThree({ payload,callback }, { call, put }) {
      const response = yield call(addCNASLevelThree, payload);
      yield put({
        type: 'addCNASLevelThreeResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *updateCNASLevelThree({ payload,callback }, { call, put }) {
      const response = yield call(updateCNASLevelThree, payload);
      yield put({
        type: 'updateCNASLevelThreeResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *deleteCNASLevelThree({ payload,callback }, { call, put }) {
      const response = yield call(deleteCNASLevelThree, payload);
      yield put({
        type: 'deleteCNASLevelThreeResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },



    *getCNASLevelFourList({ payload,callback }, { call, put }) {
      const response = yield call(getCNASLevelFourList, payload);
      yield put({
        type: 'getCNASLevelFourListResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    *addCNASLevelFour({ payload,callback }, { call, put }) {
      const response = yield call(addCNASLevelFour, payload);
      yield put({
        type: 'addCNASLevelFourResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *updateCNASLevelFour({ payload,callback }, { call, put }) {
      const response = yield call(updateCNASLevelFour, payload);
      yield put({
        type: 'updateCNASLevelFourResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *deleteCNASLevelFour({ payload,callback }, { call, put }) {
      const response = yield call(deleteCNASLevelFour, payload);
      yield put({
        type: 'deleteCNASLevelFourResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *getCnasLevelInfo({ payload,callback }, { call, put }) {
      const response = yield call(getCnasLevelInfo, payload);
      yield put({
        type: 'deleteCNASLevelFourResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },








  },

  reducers: {

    getCNASLevelOneListResult(state, { payload }) {
      return {
        ...state,
        getCNASLevelOneListResult: payload,
      };
    },

    addCNASLevelOneResult(state, { payload }) {
      return {
        ...state,
        addCNASLevelOneResult: payload.data,
      };
    },

    updateCNASLevelOneResult(state, { payload }) {
      return {
        ...state,
        updateCNASLevelOneResult: payload.data,
      };
    },


    deleteCNASLevelOneResult(state, { payload }) {
      return {
        ...state,
        deleteCNASLevelOneResult: payload.data,
      };
    },

    // 二级分类

    getCNASLevelTwoListResult(state, { payload }) {
      return {
        ...state,
        getCNASLevelTwoListResult: payload,
      };
    },

    addCNASLevelTwoResult(state, { payload }) {
      return {
        ...state,
        addCNASLevelTwoResult: payload.data,
      };
    },

    updateCNASLevelTwoResult(state, { payload }) {
      return {
        ...state,
        updateCNASLevelTwoResult: payload.data,
      };
    },


    deleteCNASLevelTwoResult(state, { payload }) {
      return {
        ...state,
        deleteCNASLevelTwoResult: payload.data,
      };
    },


    getCNASLevelThreeListResult(state, { payload }) {
      return {
        ...state,
        getCNASLevelThreeListResult: payload,
      };
    },

    addCNASLevelThreeResult(state, { payload }) {
      return {
        ...state,
        addCNASLevelThreeResult: payload.data,
      };
    },

    updateCNASLevelThreeResult(state, { payload }) {
      return {
        ...state,
        updateCNASLevelThreeResult: payload.data,
      };
    },


    deleteCNASLevelThreeResult(state, { payload }) {
      return {
        ...state,
        deleteCNASLevelThreeResult: payload.data,
      };
    },

    getCNASLevelFourListResult(state, { payload }) {
      return {
        ...state,
        getCNASLevelFourListResult: payload,
      };
    },

    addCNASLevelFourResult(state, { payload }) {
      return {
        ...state,
        addCNASLevelFourResult: payload.data,
      };
    },

    updateCNASLevelFourResult(state, { payload }) {
      return {
        ...state,
        updateCNASLevelFourResult: payload.data,
      };
    },


    deleteCNASLevelFourResult(state, { payload }) {
      return {
        ...state,
        deleteCNASLevelFourResult: payload.data,
      };
    },

    getCnasLevelInfoResult(state, { payload }) {
      return {
        ...state,
        getCnasLevelInfoResult: payload.data,
      };
    },

    handleCNASCheckFourCertCodeResult(state, { payload }) {
      return {
        ...state,
        handleCNASCheckFourCertCodeResult: payload.data,
      };
    },




  }

};
