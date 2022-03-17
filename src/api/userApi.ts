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
        method: 'post'
    })
}