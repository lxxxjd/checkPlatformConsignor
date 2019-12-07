import {addCargoSort1,updateCargoSort1,deleteCargosort1,getCargosort1List,
  getCargosort2List,addCargosort2,updateCargosort2,deleteCargosort2} from '@/services/cargo';

export default {
  namespace: 'cargo',
  state: {
    // data: [],
    cargoList:[],
    addCargoResult:{},
    updateCargoResult:{},
    deleteCargoResult:{},

    // 货物二级分类
    getCargosort2ListResult:{},
    addCargosort2Result:{},
    updateCargosort2Result:{},
    deleteCargosort2Result:{},
  },
  effects: {

    *getCargosort1List({ payload,callback }, { call, put }) {
      const response = yield call(getCargosort1List, payload);
      yield put({
        type: 'getSearchCargosResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    *addCargoSort1({ payload,callback }, { call, put }) {
      const response = yield call(addCargoSort1, payload);
      yield put({
        type: 'getAddCargoResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *updateCargoSort1({ payload,callback }, { call, put }) {
      const response = yield call(updateCargoSort1, payload);
      yield put({
        type: 'getUpdateCargoResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *deleteCargosort1({ payload,callback }, { call, put }) {
      const response = yield call(deleteCargosort1, payload);
      yield put({
        type: 'getDeleteCargoResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    // 货物二级分类

    *getCargosort2List({ payload,callback }, { call, put }) {
      const response = yield call(getCargosort2List, payload);
      yield put({
        type: 'getCargosort2ListResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    *addCargosort2({ payload,callback }, { call, put }) {
      const response = yield call(addCargosort2, payload);
      yield put({
        type: 'addCargosort2Result',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *updateCargosort2({ payload,callback }, { call, put }) {
      const response = yield call(updateCargosort2, payload);
      yield put({
        type: 'updateCargosort2Result',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *deleteCargosort2({ payload,callback }, { call, put }) {
      const response = yield call(deleteCargosort2, payload);
      yield put({
        type: 'deleteCargosort2Result',
        payload: response,
      });
      if (callback) callback(response.data);
    },


  },

  reducers: {
    getSearchCargosResult(state, { payload }) {
      return {
        ...state,
        cargoList: payload,
      };
    },

    getAddCargoResult(state, { payload }) {
      return {
        ...state,
        addCargoResult: payload.data,
      };
    },

    getUpdateCargoResult(state, { payload }) {
      return {
        ...state,
        updateCargoResult: payload.data,
      };
    },


    getDeleteCargoResult(state, { payload }) {
      return {
        ...state,
        deleteCargoResult: payload.data,
      };
    },

    // 货物二级分类
    getCargosort2ListResult(state, { payload }) {
      return {
        ...state,
        getCargosort2ListResult: payload,
      };
    },

    addCargosort2Result(state, { payload }) {
      return {
        ...state,
        addCargosort2Result: payload.data,
      };
    },

    updateCargosort2Result(state, { payload }) {
      return {
        ...state,
        updateCargosort2Result: payload.data,
      };
    },


    deleteCargosort2Result(state, { payload }) {
      return {
        ...state,
        deleteCargosort2Result: payload.data,
      };
    },


  }

};
