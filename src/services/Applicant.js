import request from '@/utils/request';
import { stringify } from 'qs';

export async function getCertFiles(params) {
  return request(`/api/cert_report/getCertFiles?reportno=${params.reportno}`);
}


export async function getPdfByOssPath(params) {
  return request(`/api/cert_report/get_pdf?osspath=${params.osspath}`);
}

export async function getReportInfo(params) {
  return request(`/api/report/get_report?reportNo=${params.reportno}`);
}

export async function getOssPdf(params) {
  return request(`/api/cert_report/get_pdf?osspath=${params.osspath}`);
}

export async function getApplyReason(params) {
  return request(`/api/cert_report/get_abandon_applyreason?reportno=${params.reportno}`);
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

export async function returnReadRecord(params) {
  return request(`/api/readrecord/returnReadRecord?reportno=${params.reportno}&reader=${params.reader}&company=${params.company}&organization=${params.organization}`);
}

export async function addEvaluation(params) {
  return request(`/api/evaluation/addEvaluation`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getCnasInfo(params) {
  return request(`/api/cnas/getCnasInfo?checkCode=${params.checkCode}`);
}
//get_pdf
export async function getRecordInfo(params) {
  return request(`/api/recordinfo/get_recordInfo?reportno=${params.reportno}&source=${params.source}`);
}

export async function addPremaininfo(params) {
  const inspway = params.inspway.join(' ');
  params.inspway = inspway;
  return request(`/api/premaininfo/addPremaininfo`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addReadRecord(params) {
  return request(`/api/readrecord/addReadRecord`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function updatePremaininfo(params) {
  const inspway = params.inspway.join(' ');
  params.inspway = inspway;
  return request(`/api/premaininfo/updatePremaininfo`,{
    method: 'POST',
    data: {
      ...params,
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

export async function getReportByRandomCode(params) {
  return request(`/api/report/getReportByRandomCode?reportno=${params.reportno}&&randomcode=${params.randomcode}`);
}


export async function getAllMan(params) {
  return request(`/api/task_info/getAllMan?reportno=${params.reportno}&&certcode=${params.certcode}`);
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

export async function getConfigorPlaceList(params) {
  return request(`/api/ConfigorPlace/getConfigorPlaceList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function getAllClientName(params) {
  if(params.content != null){
    return request(`/api/contact/getAllContacts?content=${params.content}`);
  }
  return request('/api/contact/getAllContacts');
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

