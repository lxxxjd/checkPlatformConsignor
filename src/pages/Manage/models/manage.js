import {getConfigorPlaceList, deleteConfigorPlace, addConfigorPlace} from '@/services/Manage';

export default {
  namespace: 'manage',

  state: {
    placeList:[]
  },

  effects: {
    *getConfigorPlaceList({ payload ,callback}, { call, put }) {
      const response = yield call(getConfigorPlaceList, payload);
      yield put({
        type: 'getPlaceList',
        payload:response,
      });
      if (callback) callback(response.data);
    },
    *deleteConfigorPlace({ payload ,callback}, { call, put }) {
      const response = yield call(deleteConfigorPlace, payload);
      if (callback) callback(response.data);
    },
    *addConfigorPlace({ payload ,callback}, { call, put }) {
      const response = yield call(addConfigorPlace, payload);
      if (callback) callback(response.data);
    },
  },

  reducers: {
    getPlaceList(state, { payload }) {
      return {
        ...state,
        placeList : payload.data,
      };
    },
  },
};
