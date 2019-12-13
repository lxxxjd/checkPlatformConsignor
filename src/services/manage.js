import request from '@/utils/request';
import { stringify } from 'qs';


export async function getConfigorPlaceList(params) {
  return request(`/api/ConfigorPlace/getConfigorPlaceList`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteConfigorPlace(params) {
  return request(`/api/ConfigorPlace/deleteConfigorPlace?keyno=${params.keyno}`);
}

export async function addConfigorPlace(params) {
  return request(`/api/ConfigorPlace/addConfigorPlace`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}