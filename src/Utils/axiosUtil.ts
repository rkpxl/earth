import axios, { AxiosInstance } from 'axios';
import { getCookie } from './cookieUtils';

interface AxiosWithCustomProps extends AxiosInstance {
  interceptors: any;
  context?: any;
}

const BASE_URL = process.env.NEXT_PUBLIC_HOST_URL;

const axiosInstance : AxiosWithCustomProps = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.context = null;

axiosInstance.interceptors.request.use((config: any) => {
  try {
    if (typeof localStorage === 'undefined' && config.headers) {
      const cookie = axiosInstance.context?.req?.headers?.cookie;
      config.headers.Cookie = cookie || '';
    } else {
      const authToken = getCookie('authToken')
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
    }
    return config;
  } catch (err) {
    console.error(err)
  }
});

axios.interceptors.response.use((response) => {

  console.log(" --- response ---- ", response)
  if(response.status === 401) {
       alert("You are not authorized");
  }
  return response;
}, (error) => {
  if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
  }
  return Promise.reject(error.message);
});

export default axiosInstance;
