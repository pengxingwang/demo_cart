// import { Toast } from "@ant-design/react-native";
import axios, { AxiosRequestConfig } from "axios";

const MOCK_API_PREFIX = "http://yapi.smart-xwork.cn/mock/186077";

axios.defaults.baseURL = MOCK_API_PREFIX;
axios.defaults.timeout = 30000;

axios.interceptors.request.use(
  (config) => {
    return {
      ...config,
    };
  },
  (error) => {
    console.error("[request]", error.message);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log(error);
    // Toast.fail({
    //   content: error.message,
    // });
    return Promise.reject(error);
  }
);

export type ReturnType<T> = {
  code: string | number;
  data: T;
  success: boolean;
  message: string;
};

/**
 * @description 数据请求
 * @param axiosConfig
 */
export default function request<T>(
  axiosConfig: AxiosRequestConfig
): Promise<ReturnType<T>> {
  return axios(axiosConfig)
    .then((res) => {
      if (!res.data.success) {
        // Toast.fail({
        //   content: res.data.message,
        // });
      }
      return Promise.resolve(res.data);
    })
    .catch((error) => Promise.reject(error));
}
