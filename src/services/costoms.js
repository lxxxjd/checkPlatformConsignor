import request from '@/utils/request';
import { stringify } from 'qs';


// getCustomsList,addCustoms,updateCustoms,deleteCustoms
export async function getCustomsList(params) {
  return request(`/api/Customs/getCustomsList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addCustoms(params) {
  return request(`/api/Customs/addCustoms`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function updateCustoms(params) {
  return request(`/api/Customs/updateCustoms`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}



export async function deleteCustoms(params) {
  return request(`/api/Customs/deleteCustoms`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}




export async function getCNASLevelTwoList(params) {
  return request(`/api/Customs/getCNASLevelTwoList`,{
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









