import axios from "axios";
import { Toast } from "vant";
import funs from "@/assets/utils/funs";

if (process.env.VUE_APP_NODE_ENV !== "development") {
  axios.defaults.baseURL = process.env.VUE_APP_PROXY;
}

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = funs.getCookie("Authorization") || "";
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject("serveApi:", error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (response.data.code !== undefined && response.data.code != 0) {
      if (response.data.msg && response.data.msg.length > 50) {
        Toast.warning("系统异常");
      } else {
        Toast.warning(response.data.msg);
      }
    }
    return response.data;
  },
  function(error) {
    Toast.warning("请求异常");
    return Promise.reject(error);
  }
);

export default axios;
