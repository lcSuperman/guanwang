import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import type { ApiResponse } from '@/types/api'

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

service.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
)

service.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)

export function request<T>(config: AxiosRequestConfig): Promise<T> {
  return service.request<ApiResponse<T>>(config).then((response) => {
    const { code, data, message } = response.data

    if (code === 200) {
      return data
    }

    return Promise.reject(new Error(message || '请求失败'))
  })
}

export default service
