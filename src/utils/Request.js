import axios from 'axios'

export default function Request(url, params) {
  return axios({
    // baseURL: 'https://axios-app-b8cca.firebaseio.com/',
    baseURL: 'https://diancan-d7a36.firebaseio.com/',
    url,
    method: 'get',
    ...params
  })
}