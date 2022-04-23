<script setup lang="ts">
import { OK_CODE } from '@/utils/keys'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const userInfo = reactive({
    username: '',
    password: '',
    phone: '',
    phonename: '',
    email: ''
})

const checkPhone = (rules: any, value: string, callback: any) => {
    const phoneNumber = value
    ElMessage('初始校验手机号')
    setTimeout(() => {
        let reg :any = /^1\d{10}$/;
        if (!reg.test(phoneNumber)) {
            console.log('手机号格式不正确')
            ElMessage.error('【初始校验】手机号格式不正确！')
        }
        setTimeout(() => {
            ElMessage({
                message: '初始校验手机号通过，开始二次校验',
                type: 'success',
            })
            console.log('初始校验手机号通过')
            setTimeout(() => {
                // 规则说明 2019-12-24 工信部核发190、192、196、197号段
                // 【虚拟运营商】：170[1700/1701/1702]、162(电信)，1703/1705/1706、165(移动)，1704/1707/1708/1709(联通)、171、167（联通）
                // 【卫星通信】： 1740[0-5] (电信)，1349(移动)
                // 【物联网网号】：10648、1440 (移动)，10646、146(联通)，10649、1410(电信)
                // 【国家工信部应急通信】：1740[6-9]，1741[0-2]
                // 所以整理分类号段
                // 手机号码: 13[0-9], 14[5,6,7,8,9], 15[0-3, 5-9], 16[2,5,6,7], 17[0-8], 18[0-9], 19[0-3, 5-9]
                // 移动号段: 13[4-9],147,148,15[0-2,7-9],165,170[3,5,6],172,178,18[2-4,7-8],19[5,7,8]
                // 联通号段: 130,131,132,145,146,155,156,166,167,170[4,7,8,9],171,175,176,185,186,196
                // 电信号段: 133,149,153,162,170[0,1,2],173,174[0-5],177,180,181,189,19[0,1,3,9]
                // 广电号段: 192
                const regMOBILE = /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2,5,6,7]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
                const regCNMobilE = /^((13[4-9])|(14[7-8])|(15[0-2,7-9])|(165)|(178)|(18[2-4,7-8])|(19[5,7,8]))\d{8}|(170[3,5,6])\d{7}$/
                const regCNUnicom = /^((13[0-2])|(14[5,6])|(15[5-6])|(16[6-7])|(17[1,5,6])|(18[5,6])|(196))\d{8}|(170[4,7-9])\d{7}$/
                const regCNTelecom = /^((133)|(149)|(153)|(162)|(17[3,7])|(18[0,1,9])|(19[0,1,3,9]))\d{8}|((170[0-2])|(174[0-5]))\d{7}$/
                const regCNBroadcastingNetwork = /^((192))\\d{8}$/

                if (regCNMobilE.test(phoneNumber)) {
                    ElMessage({
                        message: '【二次校验手机号】您的手机号归属 中国移动',
                        type: 'success'
                    })
                    console.log('二次校验手机号通过')
                    callback()
                    return "中国移动"
                } else if (regCNUnicom.test(phoneNumber)) {
                    ElMessage({
                        message: '【二次校验手机号】您的手机号归属 中国联通',
                        type: 'success'
                    })
                    console.log('二次校验手机号通过')
                    callback()
                    return "中国联通"
                } else if (regCNTelecom.test(phoneNumber)) {
                    ElMessage({
                        message: '【二次校验手机号】您的手机号归属 中国电信',
                        type: 'success'
                    })
                    console.log('二次校验手机号通过')
                    callback()
                    return "中国电信"
                } else if (regCNBroadcastingNetwork.test(phoneNumber)) {
                    ElMessage({
                        message: '【二次校验手机号】您的手机号归属 中国广电',
                        type: 'success'
                    })
                    console.log('二次校验手机号通过')
                    callback()
                    return "中国广电"
                } else if (regMOBILE.test(phoneNumber)) {
                    ElMessage({
                        message: '【二次校验手机号】您的手机号归属 合法',
                        type: 'warning'
                    })
                    console.log('二次校验手机号通过')
                    callback()
                    return true
                } else {
                    ElMessage.error('【二次校验手机号】您的手机号归属 不合法！')
                    console.log('二次校验手机号未通过')
                    userInfo.phone = ''
                    callback(new Error("Please input the current phone number"))
                    return false
                }
            }, 5000)
        }, 3500)

        console.log(phoneNumber)
        reg = /^(\d{3})\d{4}(\d{4})$/;
        (document as any).getElementById("phone").value = value.replace(reg, "$1****$2")
    }, 5000)
}

const checkEmail = (rules: any, value: string, callback: any) => {
    const emailVal = value
    ElMessage('校验邮箱')
    setTimeout(() => {
        let reg1: any = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        let reg2: any = /^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (reg1.test(emailVal)) {
            ElMessage({
                message: '邮箱校验通过',
                type: 'success'
            })
            callback()
        } else if (reg2.test(emailVal)) {
            ElMessage({
                message: '邮箱校验通过',
                type: 'success'
            })
            callback()
        } else {
            ElMessage.error('邮箱校验 未通过！')
            console.log('邮箱校验未通过')
            userInfo.email = ''
            callback(new Error("Please input the current email"))
        }
    }, 5000)
}

const rules = {
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        }
    ],
    phone: [
        {
            required: true,
            validator: checkPhone,
            trigger: 'blur'
        }
    ],
    phonename: [
        {
            required: true,
            trigger: 'blur'
        }
    ],
    email: [
        {
            required: true,
            validator: checkEmail,
            trigger: 'blur'
        }
    ]
}

const formEl = ref<HTMLFormElement | null>(null)

const router = useRouter()

const handleSubmit = (e: Event) => {
    e.preventDefault()
    formEl.value!.validate().then(async (ok: boolean) => {
        if (!ok) return
        axios({
            method: "POST",
            url: "/users/register",
            data: userInfo,
            transformRequest: [(data) => {
                let ret = ""
                for (let i in data) {
                    ret += encodeURIComponent(i) + "=" + encodeURIComponent(data[i]) + "&"
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res) => {
            console.log(res.data)
            if (res.data.code === OK_CODE) {
                ElMessage.success(res.data.msg)
                router.push({ name: 'Login' })
                return
            }
            ElMessage({
                message: 'Error ' + res.data.message,
                type: 'warning',
            })
        }).catch((err) => {
            console.log(err)
            ElMessage({
                message: 'Error ' + err,
                type: 'warning',
            })
        })
    })
}

const toLoginPage = () => {
    router.push({ name: 'Login' })
}

const toHomePage = () => {
    router.push({ name: '首页' })
}
</script>

<template>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img
                    class="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 select-none">注册用户</h2>
            </div>
            <el-form
                class="mt-8 space-y-6"
                :model="userInfo"
                :rules="rules"
                @submit="handleSubmit"
                ref="formEl"
            >
                <el-row :gutter="24" class="row-wrapper">
                    <el-col :span="12">
                        <el-form-item prop="username">
                            <el-input placeholder="用户名" v-model="userInfo.username" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="phone">
                            <el-input
                                type="tel"
                                id="phone"
                                placeholder="手机号"
                                v-model="userInfo.phone"
                                clearable
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item prop="password">
                            <el-input
                                placeholder="密&nbsp;&nbsp;码"
                                type="password"
                                v-model="userInfo.password"
                                show-password
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="phonename">
                            <el-input placeholder="联系人" v-model="userInfo.phonename" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item prop="email">
                    <el-input type="email" placeholder="E-mail" v-model="userInfo.email" class="-mt-4" />
                </el-form-item>
                <el-form-item>
                    <el-button class="w-full" type="primary" native-type="submit">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <app-icon icon="heroicons-solid:lock-closed" />
                        </span>
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="w-full" @click="toLoginPage">登录</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="w-full" @click="toHomePage">返回平台主页</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.row-wrapper {
    @apply -mb-4;
}
</style>