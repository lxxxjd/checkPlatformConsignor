import request from '@/utils/request';
import { stringify } from 'qs';

//    getCNASLevelOneList,addCNASLevelOne,updateCNASLevelOne,deleteCNASLevelOne

export async function getCNASLevelOneList(params) {
  return request(`/api/cnasLevelOne/getCNASLevelOneList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addCNASLevelOne(params) {
  return request(`/api/cnasLevelOne/addCNASLevelOne`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function updateCNASLevelOne(params) {
  return request(`/api/cnasLevelOne/updateCNASLevelOne`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}



export async function deleteCNASLevelOne(params) {
  return request(`/api/cnasLevelOne/deleteCNASLevelOne`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}




export async function getCNASLevelTwoList(params) {
  return request(`/api/cnasLevelTwo/getCNASLevelTwoList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addCNASLevelTwo(params) {
  return request(`/api/cnasLevelTwo/addCNASLevelTwo`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function updateCNASLevelTwo(params) {
  return request(`/api/cnasLevelTwo/updateCNASLevelTwo`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}



export async function deleteCNASLevelTwo(params) {
  return request(`/api/cnasLevelTwo/deleteCNASLevelTwo`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}



// 三级分类
export async function getCNASLevelThreeList(params) {
  return request(`/api/CNASLevelThree/getCNASLevelThreeList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addCNASLevelThree(params) {
  return request(`/api/CNASLevelThree/addCNASLevelThree`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function updateCNASLevelThree(params) {
  return request(`/api/CNASLevelThree/updateCNASLevelThree`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}



export async function deleteCNASLevelThree(params) {
  return request(`/api/CNASLevelThree/deleteCNASLevelThree`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


// 四级分类

export async function getCNASLevelFourList(params) {
  return request(`/api/CNASLevelFour/getCNASLevelFourList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addCNASLevelFour(params) {
  return request(`/api/CNASLevelFour/addCNASLevelFour`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function updateCNASLevelFour(params) {
  return request(`/api/CNASLevelFour/updateCNASLevelFour`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}



export async function deleteCNASLevelFour(params) {
  return request(`/api/CNASLevelFour/deleteCNASLevelFour`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}



export async function getCnasLevelInfo() {
  return request(`/api/cnas//getCnasLevelInfo`);
}




export async function getCNASCheckFourCertCodeListInfo(params) {
  return request(`/api/CNASCheckFourCertCode/getCNASCheckFourCertCodeListInfo`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function handleCNASCheckFourCertCode(params) {
  return request(`/api/CNASCheckFourCertCode/handleCNASCheckFourCertCode`,{
    method: 'POST',
    data: params,
  });
}



