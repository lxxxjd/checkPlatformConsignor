import {queryAllReports,queryAllReportsByFilter,queryReport,getAllClientName,getCheckProject,getCargos,getContacts,
  searchCargos,getCompanyList,upload,getPremaininfoList, addPremaininfo,getPremaininfo,deletePremaininfo} from '@/services/Applicant';

export default {
  namespace: 'applicant',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    clientName:[],
    cargos: [],
    copyNo:'',
    deleteResult:null,
    checkProject:[],
    preMainInfoList:[]
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAllReports, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *getCompanyList({ payload ,callback}, { call, put }) {
      const response = yield call(getCompanyList, payload);
      if (callback) callback(response);
    },

    *addPremaininfo({ payload ,callback}, { call, put }) {
      const response = yield call(addPremaininfo, payload);
      if (callback) callback(response);
    },

    *deletePremaininfo({ payload ,callback}, { call, put }) {
      const response = yield call(deletePremaininfo, payload);
      if (callback) callback(response);
    },

    *getPremaininfoList({ payload ,callback}, { call, put }) {
      const response = yield call(getPremaininfoList, payload);
      yield put({
        type: 'getPremaininfos',
        payload: response,
      });
      if (callback) callback(response);
    },
    *getPremaininfo({ payload ,callback}, { call, put }) {
      const response = yield call(getPremaininfo, payload);
      if (callback) callback(response);
    },
    *upload({ payload ,callback}, { call, put }) {
      const response = yield call(upload, payload);
      if (callback) callback(response);
    },

    *filter({ payload }, { call, put }) {
      const response = yield call(queryAllReportsByFilter, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *getReport({ payload,callback }, { call, put }) {
      const response = yield call(queryReport, payload);
      yield put({
        type: 'get',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getClientName({ payload ,callback}, { call, put }) {
      const response = yield call(getAllClientName, payload);
      yield put({
        type: 'getName',
        payload:response,
      });
      if (callback) callback(response.data);
    },

    *getCheckProject({ payload,callback }, { call, put }) {
      const response = yield call(getCheckProject, payload);
      yield put({
        type: 'getCheckProjectName',
        payload:response,
      });
      if (callback) callback(response.data);
    },

    *getTradeWay({ payload ,callback}, { call, put }) {
      const response = yield call(getTradeWay, payload);
      yield put({
        type: 'getTradeWayName',
        payload:response,
      });
      if (callback) callback(response.data);
    },


    *getCargos({ payload ,callback}, { call, put }) {
      const response = yield call(getCargos, payload);
      yield put({
        type: 'getCargosName',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *searchCargos({ payload ,callback}, { call, put }) {
      const response = yield call(searchCargos, payload);
      yield put({
        type: 'getCargosName',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(cancelReportItem, payload);
      yield put({
        type: 'delete',
        payload:response,
      });
      if (callback) callback();
    },
    *getContacts({ payload, callback }, { call, put }) {
      const response = yield call(getContacts, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    submit(state, { payload }) {
      return {
        ...state,
        report: payload.data,
      };
    },
    update(state, { payload }) {
      return {
        ...state,
        report: payload.data,
      };
    },
    getPremaininfos(state, { payload }) {
      return {
        ...state,
        preMainInfoList: payload.data,
      };
    },
    get(state, { payload }) {
      return {
        ...state,
        report: payload.data,
      };
    },
    getName(state, { payload }) {
      return {
        ...state,
        clientName: payload.data,
      };
    },
    getCheckProjectName(state, { payload }) {
      return {
        ...state,
        checkProject: payload.data,
      };
    },

    getTradeWayName(state, { payload }) {
      return {
        ...state,
        tradeway: payload.data,
      };
    },
    getCargosName(state, { payload }) {
      return {
        ...state,
        tradeway: payload.data,
      };
    },

    save(state, {payload}) {
      return {
        ...state,
        data: payload.data,
      };
    },
    delete(state, { payload }) {
      return {
        ...state,
        deleteResult: payload,
      };
    },
  },
};
