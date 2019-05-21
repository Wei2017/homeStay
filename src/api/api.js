import axios from 'axios'
const BASEURL = 'http://112.250.88.10:8081/api/v1/tecnova-ifrcs'
// 登录
export const requestLogin = params => {
  return axios
    .post(`${bse1}/auth/login`, params)
    .then(res => res.data)
    .catch(res => res.data)
}