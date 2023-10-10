import http from "@/utils/http";
import { Login } from "../interface";


export const loginApi = (params: Login.ReqLoginFrom) => {
  return http.post<Login.ResLogin>('/api/user/login', params)
}