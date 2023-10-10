import http from '@/utils/http.ts'
import { Login } from '../interface'

export const getAuthMenuListApi = () => {
  return http.get<Login.ReqLoginFrom>('api'+'/auth/menulist')
}
