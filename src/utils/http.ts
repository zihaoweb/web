import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores/modules/user';
import { ResultData } from '@/stores/interface';
import { ResultEnum } from '@/enums/httpEnum';
import { ElMessage } from 'element-plus';
import { LOGIN_URL } from '@/config';
import router from '@/router';

const config = {
  baseUrl: 'http://localhost:3000',
  timeout: 5000,
}
export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  noLoading?: boolean;
}

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // instantiation
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const userStore = useUserStore();
        // 当前请求不需要显示 loading，在 api 服务中通过指定的第三个参数: { noLoading: true } 来控制
        if (config.headers && typeof config.headers.set === "function") {
          config.headers.set("x-access-token", userStore.token);
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;
        const userStore = useUserStore();
        // 登陆失效
        if (data.code == ResultEnum.OVERDUE) {
          userStore.setToken("");
          router.replace(LOGIN_URL);
          ElMessage.error(data.msg);
          return Promise.reject(data);
        }
        // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          ElMessage.error(data.msg);
          return Promise.reject(data);
        }
        // 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return data;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object | string, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: "blob" });
  }
}

export default new RequestHttp(config);


// const service = axios.create({
//   baseURL: 'http://localhost:3000',
//   timeout: 5000, // request timeout
// })

// service.interceptors.request.use(
//   config => {
//     // if (store.getters.token) {
//     //   config.headers['X-Token'] = getToken()
//     // }
//     return config
//   },
//   error => {
//     console.log(error) // for debug
//     return Promise.reject(error)
//   },
// )

// service.interceptors.response.use(
//   response => {
//     const res = response.data
//     if (res.code !== 20000) {
//       console.log('接口信息报错',res.message)
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('接口信息报错' + error)
//     return Promise.reject(error)
//   },
// )

// export default service