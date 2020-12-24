import axios from 'axios';
import Cookies from 'js-cookie';
import { message } from 'antd';
import { getDvaApp } from 'umi';
import { delay, getCookieDomain } from './web';

// 超过LOADING_DELAY时间，才显示Loading
// const LOADING_DELAY = 50;
// let timer = null;

// HTTP错误代码
const HTTP_ERROR_CODE = {
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  406: '请求参数错误(406)',
  408: '请求超时(408)',
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)',
  505: 'HTTP版本不受支持(505)',
};
// 服务器错误代码
export const SERVER_ERROR_CODE = {
  50000: '服务器错误!',
  51000: '未授权，请重新登录',
};

// 全局axios配置
axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = 5 * 1000;

// request拦截器
axios.interceptors.request.use((config: any) => {
  getDvaApp()._store.dispatch({ type: 'global/loading', payload: 'CREATE' });
  // 需要权限的接口的token验证
  const token = Cookies.get('AI_YEI_TOKEN');
  if (token) config.headers.common.token = token;
  return config;
});

// response拦截器
axios.interceptors.response.use(
  (res: any) => {
    getDvaApp()._store.dispatch({ type: 'global/loading', payload: 'REMOVE' });
    return res;
  },
  (
    err:
      | { response: { status: 400 | 401 | 403 | 404 | 406 | 408 | 500 | 501 | 502 | 503 | 504 | 505 } }
      | null
      | undefined,
  ) => {
    getDvaApp()._store.dispatch({ type: 'global/loading', payload: 'REMOVE' });
    const errorMessage = (err && err.response && HTTP_ERROR_CODE[err.response.status]) || '连接服务器失败!';
    message.error(errorMessage);
    return Promise.reject(errorMessage);
  },
);

const permissionParser = (res: any) =>
  new Promise(async (resolve, reject) => {
    const { data } = res;
    if (data && data && data.code && data.code === 51000) {
      message.warning(SERVER_ERROR_CODE[51000]);
      Cookies.remove('AI_YEI_TOKEN', { path: '/', domain: getCookieDomain() });
      localStorage.removeItem('AI_YEI_USER');
      await delay(500);
      window.location.href = '/login';
      reject(SERVER_ERROR_CODE[51000]);
    } else {
      resolve(res);
    }
  });

const defaultParser = (res: any, _FLOW?: boolean) =>
  new Promise((resolve, reject) => {
    res = res.data;
    if (res) {
      const { code, data } = res;
      if (code === 20000) {
        resolve(data);
      } else if (code === 20001 || _FLOW) {
        message.error(res.message);
        resolve(res.message);
      } else {
        message.error(res.message);
        reject(res.message);
      }
    } else {
      message.error('接口错误!');
      reject('接口错误!');
    }
  });

const downloadParser = (res: any) =>
  new Promise((resolve, reject) => {
    // 二进制流下载文件处理【'application/vnd.ms-excel'为MapGallery页面使用的特殊类型】
    if (['application/octet-stream', 'application/vnd.ms-excel'].includes(res.headers['content-type'])) {
      const fileName = res.headers['content-disposition'].match(/filename=(\S*)/)[1] || 'NA'; // 下载后文件名
      const blob = new Blob([res.data], { type: 'charset=utf-8' });
      if (window.navigator.msSaveOrOpenBlob) {
        console.log("found msSaveBlob function - is't IE");
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        console.log("not found msSaveBlob function - is't not IE");
        const downloadElement = document.createElement('a');
        const href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = fileName;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
      }
      resolve();
    } else {
      message.error('文件下载失败!');
      reject('文件下载失败!');
    }
  });

export const get = (url: string, query?: any) =>
  new Promise(resolve => {
    axios(url, {
      method: 'GET',
      params: {
        ...query,
        time: new Date().getTime(),
      },
    })
      .then(permissionParser)
      .then((r: any) => defaultParser(r, query ? query._FLOW : false))
      .then((r: unknown) => resolve(r))
      .catch((e: any) => console.error(e));
  });

export const post = (url: string, data?: any, query?: any) =>
  new Promise(resolve => {
    axios(url, {
      method: 'POST',
      data,
      params: query,
    })
      .then(permissionParser)
      .then((r: any) => defaultParser(r, query ? query._FLOW : false))
      .then((r: unknown) => resolve(r))
      .catch((e: any) => console.error(e));
  });

export const put = (url: string, data?: any, query?: any) =>
  new Promise(resolve => {
    axios(url, {
      method: 'PUT',
      data,
      params: query,
    })
      .then(permissionParser)
      .then((r: any) => defaultParser(r, query ? query._FLOW : false))
      .then((r: unknown) => resolve(r))
      .catch((e: any) => console.error(e));
  });

export const del = (url: string, data?: any, query?: any) =>
  new Promise(resolve => {
    axios(url, {
      method: 'DELETE',
      data,
      params: query,
    })
      .then(permissionParser)
      .then((r: any) => defaultParser(r, query ? query._FLOW : false))
      .then((r: unknown) => resolve(r))
      .catch((e: any) => console.error(e));
  });

export const download = (url: string, options?: any) =>
  new Promise(resolve => {
    axios(url, {
      responseType: 'arraybuffer',
      ...options,
    })
      .then(downloadParser)
      .then((r: unknown) => resolve(r))
      .catch((e: any) => console.error(e));
  });

export const callApi = (url: string, options?: any) =>
  new Promise(resolve => {
    axios(url, options)
      .then((options && options.parser) || defaultParser)
      .then((r: unknown) => resolve(r))
      .catch((e: any) => console.error(e));
  });

export const getEQParams = (query: any) => {
  const newQuery: any = {};
  for (const key in query) {
    newQuery[`filter_EQ_${key}`] = query[key];
  }
  return newQuery;
};

export default axios;
