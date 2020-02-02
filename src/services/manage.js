import request from '@/utils/request';
import { stringify } from 'qs';


export async function getConfigorPlaceList(params) {
  return request(`/api/ConfigorPlace/getConfigorPlaceList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function searchPlaceByPlaceCode(params) {
  return request(`/api/ConfigorPlace/searchPlaceByPlaceCode?placename=${params.placename}&placecode=${params.placecode}&consigoruser=${params.consigoruser}`);
}

export async function deleteConfigorPlace(params) {
  return request(`/api/ConfigorPlace/deleteConfigorPlace?keyno=${params.keyno}`);
}

export async function addConfigorPlace(params) {
  return request(`/api/ConfigorPlace/addConfigorPlace`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateConfigorPlace(params) {
  return request(`/api/ConfigorPlace/updateConfigorPlace`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateContact(params) {
  return request(`/api/contact/updateContact`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getConfigorCargoList(params) {
  return request(`/api/ConfigorCargo/getConfigorCargoList`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function addConfigorCargo(params) {
  return request(`/api/ConfigorCargo/addConfigorCargo`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateConfigorCargo(params) {
  return request(`/api/ConfigorCargo/updateConfigorCargo`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteConfigorCargo(params) {
  return request(`/api/ConfigorCargo/deleteConfigorCargo?keyno=${params.keyno}`);
}


export async function searchCargos(params) {
  return request(`/api/cargo/search_cargos`,{
    method: 'POST',
    data: params,
  });
}
