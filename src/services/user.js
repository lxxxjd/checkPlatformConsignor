import { stringify } from 'qs';
import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}


export async function checkUserName(params) {
  return request(`/api/user/check_user?username=${params.username}`);
}

// 发送验证码
export async function sendVerify(params) {
  return request(`/api/verify/send_verify?tel=${params.tel}`);
}

// 验证验证码
export async function verifyTel(params) {
  return request(`/api/verify/verify_tel?verifyCode=${params.verifyCode}&tel=${params.tel}`);
}

// 得到所有user
export async function getUserList() {
  return request(`/api/user/getUserList`);
}


// 预注册公司
export async function registerPreCompany(params) {
  return request(`/api/precompany/register_precompany`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}







