import axios from 'axios'

const host = '' // require('config/exchange')

const callApi = (url, method, data, options = {}) => {
  const opts = { ...options }
  const reqContent = {
    ...{
      method,
      baseURL: host || '',
      url,
      headers: {
        'Content-Type': 'application/json',
        'SessionKey': '861fdf86-a53a-4c08-a826-23b88bae8899'
      },
      // 添加在请求URL后面的参数
      params: method === 'get' ? data : {},
      // 适用于 PUT POST PATCH
      data: method !== 'get' ? data : {},
      withCredentials: true,
    },
    ...opts,
  }

  return axios(reqContent)
}

const callGraphql = (url, data, options = {}) => {
  const opts = { ...options }
  const reqContent = {
    ...{
      method: 'post',
      baseURL: host || '',
      url,
      headers: {
        'Content-Type': 'application/graphql',
      },
      data, // 适用于 PUT POST PATCH
      withCredentials: true,
    },
    ...opts,
  }

  return axios(reqContent)
}

export default {
  callApi,
  callGraphql,
  get: (url, data = {}) => callApi(url, 'get', data),
  put: (url, data = {}) => callApi(url, 'put', data),
  post: (url, data = {}) => callApi(url, 'post', data),
  delete: (url, data = {}) => callApi(url, 'delete', data),
}
