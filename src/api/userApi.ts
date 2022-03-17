import { BasicResp } from './types'
import useHttp from './useHttp'

export interface RegParams {
    username: string;
    password: string;
    phone: string;
    phonename: string;
    email: string;
}

export const reqUserRegister = (params :RegParams) => {
    return useHttp<BasicResp<any>>({
        url: `/api/users/register`,
        method: 'post',
        data: { ...params }
    })
}

export interface LoginParams {
    username: string;
    password: string;
}

export interface LoginData {
  info: UserInfo;
  token: string;
}

export interface UserInfo {
  _id: string;
  avatar: string;
  createTime: string;
  jurisdiction: string;
  password: string;
  phone: string;
  phonename: string;
  updateTime: string;
  userId: string;
  username: string;
  email: string;
}

export const reqUserLogin = (params :LoginParams) => {
    return useHttp<BasicResp<LoginData>>({
        url: `/api/users/login`,
        method: 'post',
        data: { ...params }
    })
}