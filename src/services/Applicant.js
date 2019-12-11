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

export async function getReportByConfigor(params) {
  return request(`/api/ConfigorAuthority/getReportByConfigor`,{
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


export async function deletePremaininfo(params) {
  return request(`/api/premaininfo/deletePremaininfo?prereportno=${params.prereportno}`);
}

export async function getPreRecord(params) {
  return request(`/api/preRecordInfo/getRecord?prereportno=${params.prereportno}`);
}

export async function deletePreRecord(params) {
  return request(`/api/preRecordInfo/deleteRecord?id=${params.id}`);
}

export async function unfollow(params) {
  return request(`/api/ConfigorAuthority/unfollow?reportNo=${params.reportNo}&&consigoruser=${params.consigoruser}`);
}

export async function follow(params) {
  return request(`/api/ConfigorAuthority/follow?reportNo=${params.reportNo}&&consigoruser=${params.consigoruser}`);
}

export async function getPremaininfo(params) {
  return request(`/api/premaininfo/getPremaininfo?prereportno=${params.prereportno}`);
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

