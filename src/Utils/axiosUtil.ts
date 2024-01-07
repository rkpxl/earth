import axios, { AxiosInstance } from 'axios';

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
  if (typeof localStorage === 'undefined' && config.headers) {
    const cookie = axiosInstance.context?.req?.headers?.cookie;
    config.headers.Cookie = cookie || '';
  }
  return config;
});

export default axiosInstance;
