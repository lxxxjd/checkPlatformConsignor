import {
  getCustomsList,addCustoms,updateCustoms,deleteCustoms
} from '@/services/costoms';

export default {
  namespace: 'customs',
  state: {
    getCustomsListResult:{},addCustomsResult:{},updateCustomsResult:{},deleteCustomsResult:{},
  },
  effects: {

    *getCustomsList({ payload,callback }, { call, put }) {
      const response = yield call(getCustomsList, payload);
      yield put({
        type: 'getCustomsListResult',
        payload: response,
      });
      if (callback) callback(response);
    },

    *addCustoms({ payload,callback }, { call, put }) {
      const response = yield call(addCustoms, payload);
      yield put({
        type: 'addCustomsResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *updateCustoms({ payload,callback }, { call, put }) {
      const response = yield call(updateCustoms, payload);
      yield put({
        type: 'updateCustomsResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },


    *deleteCustoms({ payload,callback }, { call, put }) {
      const response = yield call(deleteCustoms, payload);
      yield put({
        type: 'deleteCustomsResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },



  },

  reducers: {

    // getCustomsListResult:{},addCustomsResult:{},updateCustomsResult:{},deleteCustomsResult:{},
    getCustomsListResult(state, { payload }) {
      return {
        ...state,
        getCustomsListResult: payload,
      };
    },

    addCustomsResult(state, { payload }) {
      return {
        ...state,
        addCustomsResult: payload.data,
      };
    },

    updateCustomsResult(state, { payload }) {
      return {
        ...state,
        updateCustomsResult: payload.data,
      };
    },


    deleteCustomsResult(state, { payload }) {
      return {
        ...state,
        deleteCustomsResult: payload.data,
      };
    },


  }

};
