import {getAllClientName,getCheckProject,getCargos,getContacts,
  searchCargos,getCompanyList,upload,getPremaininfoList, addPremaininfo,getPremaininfo,deletePremaininfo,getReportByConfigor,getPreRecord,
  deletePreRecord,getReportByRandomCode,follow,unfollow, getOssPdf, updatePremaininfo, getReportInfo ,
  getRecordInfo,getCnasInfo,getAllMan,getConfigorPlaceList, addEvaluation, getCertFiles, getPdfByOssPath,
  addReadRecord, getApplyReason, returnReadRecord,getBusiness, getConfigorCargoList, getCerFilesByRandomCode,getCustomInfos,getRepeatCustomsNo,getFileStream} from '@/services/Applicant';
import{searchPlaceByPlaceCode} from '@/services/manage';
import{searchCompanyList,searchAllCompanyListForContact} from '@/services/company';

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
    preMainInfoList:[],
    reports:[],
    preRecordData:[],
    report:{},
    records:[],
    recordData:[],
  },

  effects: {

    // 按地区编码搜索货物
    *searchPlaceByPlaceCode({ payload ,callback}, { call, put }) {
      const response = yield call(searchPlaceByPlaceCode, payload);
      if (callback) callback(response.data);
    },

    // 报关号查重
    *getRepeatCustomsNo({ payload , callback}, { call, put }) {
      const response = yield call(getRepeatCustomsNo, payload);
      if (callback) callback(response.data);
    },

    *getCustomInfos({ payload ,callback}, { call, put }) {
      const response = yield call(getCustomInfos, payload);
      if (callback) callback(response.data);
    },
    *getBusiness({ payload ,callback}, { call, put }) {
      const response = yield call(getBusiness, payload);
      if (callback) callback(response.data);
    },
    *getConfigorPlaceList({ payload ,callback}, { call, put }) {
      const response = yield call(getConfigorPlaceList, payload);
      if (callback) callback(response.data);
    },
    *getConfigorCargoList({ payload ,callback}, { call, put }) {
      const response = yield call(getConfigorCargoList, payload);
      if (callback) callback(response.data);
    },
    *getCerFilesByRandomCode({ payload ,callback}, { call, put }) {
      const response = yield call(getCerFilesByRandomCode, payload);
      if (callback) callback(response);
    },
    *getApplyReason({ payload ,callback}, { call, put }) {
      const response = yield call(getApplyReason, payload);
      if (callback) callback(response);
    },
    *returnReadRecord({ payload ,callback}, { call, put }) {
      const response = yield call(returnReadRecord, payload);
      if (callback) callback(response);
    },
    *getPdfByOssPath({ payload ,callback}, { call, put }) {
      const response = yield call(getPdfByOssPath, payload);
      if (callback) callback(response);
    },
    *addReadRecord({ payload ,callback}, { call, put }) {
      const response = yield call(addReadRecord, payload);
      if (callback) callback(response.data);
    },
    *addEvaluation({ payload ,callback}, { call, put }) {
      const response = yield call(addEvaluation, payload);
      if (callback) callback(response);
    },
    *getRecordInfo({ payload ,callback}, { call, put }) {
      const response = yield call(getRecordInfo, payload);
      yield put({
        type: 'getRecords',
        payload: response,
      });
      if (callback) callback(response);
    },
    *getCertFiles({ payload ,callback}, { call, put }) {
      const response = yield call(getCertFiles, payload);
      yield put({
        type: 'getCertFile',
        payload: response,
      });
      if (callback) callback(response);
    },
    *getAllMan({ payload ,callback}, { call, put }) {
      const response = yield call(getAllMan, payload);
      if (callback) callback(response);
    },
    *getReportInfo({ payload ,callback}, { call, put }) {
      const response = yield call(getReportInfo, payload);
      yield put({
        type: 'getReport',
        payload: response,
      });
      if (callback) callback(response);
    },
    *getReportByConfigor({ payload ,callback}, { call, put }) {
      const response = yield call(getReportByConfigor, payload);
      if (callback) callback(response);
    },
    *getPreRecord({ payload ,callback}, { call, put }) {
      const response = yield call(getPreRecord, payload);
      yield put({
        type: 'getPreRecords',
        payload: response,
      });
      if (callback) callback(response);
    },
    *searchCompanyList({ payload ,callback}, { call, put }) {
      const response = yield call(searchCompanyList, payload);
      if (callback) callback(response);
    },


    *searchAllCompanyListForContact({ payload ,callback}, { call, put }) {
      const response = yield call(searchAllCompanyListForContact, payload);
      if (callback) callback(response);
    },

    *getCompanyList({ payload ,callback}, { call, put }) {
      const response = yield call(getCompanyList, payload);
      if (callback) callback(response);
    },

    *getCnasInfo({ payload ,callback}, { call, put }) {
      const response = yield call(getCnasInfo, payload);
      if (callback) callback(response);
    },
    *updatePremaininfo({ payload ,callback}, { call, put }) {
      const response = yield call(updatePremaininfo, payload);
      if (callback) callback(response);
    },
    *getOssPdf({ payload ,callback}, { call, put }) {
      const response = yield call(getOssPdf, payload);
      if (callback) callback(response);
    },
    *getFileStream({ payload ,callback}, { call, put }) {
      const response = yield call(getFileStream, payload);
      if (callback) callback(response);
    },
    *follow({ payload ,callback}, { call, put }) {
      const response = yield call(follow, payload);
      if (callback) callback(response);
    },
    *unfollow({ payload ,callback}, { call, put }) {
      const response = yield call(unfollow, payload);
      if (callback) callback(response);
    },
    *deletePreRecord({ payload ,callback}, { call, put }) {
      const response = yield call(deletePreRecord, payload);
      if (callback) callback(response);
    },
    *getReportByRandomCode({ payload ,callback}, { call, put }) {
      const response = yield call(getReportByRandomCode, payload);
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
    getCertFile(state, { payload }) {
      return {
        ...state,
        recordData: payload.data,
      };
    },
    getRecords(state, { payload }) {
      return {
        ...state,
        records : payload.data,
      };
    },
    getReports(state, { payload }) {
      return {
        ...state,
        reports: payload.data,
      };
    },
    getReport(state, { payload }) {
      return {
        ...state,
        report: payload.data,
      };
    },
    getPreRecords(state, { payload }) {
      return {
        ...state,
        preRecordData: payload.data,
      };
    },
    getPremaininfos(state, { payload }) {
      return {
        ...state,
        preMainInfoList: payload.data,
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
  },
};
