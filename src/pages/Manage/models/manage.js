import {getConfigorPlaceList, deleteConfigorPlace, addConfigorPlace,updateContact} from '@/services/Manage';
import {getBusiness} from '@/services/Applicant'

export default {
  namespace: 'manage',

  state: {
    placeList:[]
  },

  effects: {

    *getBusiness({ payload ,callback}, { call, put }) {
      const response = yield call(getBusiness, payload);
      if (callback) callback(response.data);
    },

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
    *updateContact({ payload ,callback}, { call, put }) {
      const response = yield call(updateContact, payload);
      if (callback) callback(response);
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
