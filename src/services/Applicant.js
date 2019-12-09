import request from '@/utils/request';
import { stringify } from 'qs';





export async function queryAllReports(params) {
  return request(`/api/report/getAllReports`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryAllReportsByFilter(params) {
  return request(`/api/report/filter_report`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}


export async function getPremaininfoList(params) {
  return request(`/api/premaininfo/getPremaininfoList`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function addPremaininfo(params) {
  const inspway = params.inspway.join(' ');
  params.inspway = inspway;
  return request(`/api/premaininfo/addPremaininfo`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getCompanyList(params) {
  return request(`/api/company/getCompanyList`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function upload(params) {
    return request(`/api/preRecordInfo/upload`,{
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data;'},
    data:params,
  });
}

export async function queryReport(params) {
  return request(`/api/report/get_report?reportNo=${params}`);
}

export async function getContacts(params) {
  return request(`/api/contact/getContacts?companyName=${params.value}`);
}
export async function getAllClientName(params) {
  if(params.content != null){
    return request(`/api/client/getAllClientName?content=${params.content}`);
  }
  return request('/api/client/getAllClientName');
}


export async function getCheckProject(params) {
  return request(`/api/check_project/get_project?certCode=${params.certCode}`);
}

export async function getCargos(params) {
  return request(`/api/cargo/get_cargos`);
}
export async function searchCargos(params) {
  return request(`/api/cargo/search_cargos?value=${params.value}`);
}

