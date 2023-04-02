import http from '@/plugins/http-common'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
abstract class AbstractApiService {
  protected path = ''
  protected http: AxiosInstance

  protected constructor(path: string) {
    this.path = path
    this.http = http
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(id: string, params: any = null) {
    return http.get(`${this.path}/${id}`, params)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(data: any) {
    return http.post(`${this.path}`, data)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set(id: string, data?: any, config?: AxiosRequestConfig) {
    return http.post(`${this.path}/${id}`, data, config)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(id: string, data: any = null, config?: AxiosRequestConfig) {
    return http.put(`${this.path}/${id}`, data, config)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete(id: string, params?: AxiosRequestConfig) {
    return http.delete(`${this.path}/${id}`, params)
  }

  deleteAll() {
    return http.delete(`${this.path}`)
  }
}

export default AbstractApiService
