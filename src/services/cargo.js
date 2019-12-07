import request from '@/utils/request';
import { stringify } from 'qs';

// addCargoSort1,updateCargoSort1,deleteCargosort1,getCargosort1List
export async function addCargoSort1(params) {
  return request(`/api/cargoSort1/add_cargosort1`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateCargoSort1(params) {
  return request(`/api/cargoSort1/update_cargosort1`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteCargosort1(params) {
  return request(`/api/cargoSort1/delete_cargosort1`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getCargosort1List(params) {
  return request(`/api/cargoSort1/get_cargosort1List`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// cargosort2
// getCargosort2List,addCargosort2,updateCargosort2,deleteCargosort2
export async function getCargosort2List(params) {
  return request(`/api/cargoSort2/getCargosort2List`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addCargosort2(params) {
  return request(`/api/cargoSort2/addCargosort2`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateCargosort2(params) {
  return request(`/api/cargoSort2/updateCargosort2`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteCargosort2(params) {
  return request(`/api/cargoSort2/deleteCargosort2`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}









