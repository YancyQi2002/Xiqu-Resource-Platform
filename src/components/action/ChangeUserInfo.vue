<template>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 select-none">修改用户信息</h2>
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
                            <el-input placeholder="用户名" v-model="userInfo.username" disabled />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item>
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="目前仅能修改当前登录用户的密码"
                            placement="top"
                        >
                            <el-button class="w-full"  type="primary" @click="toChangeUserPasswordPage">
                                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <app-icon icon="heroicons-solid:lock-closed"/>
                                </span>
                                修改密码
                            </el-button>
                        </el-tooltip>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" class="row-wrapper">
                    <el-col :span="12">
                        <el-form-item prop="phone">
                            <el-input placeholder="新手机号" v-model="userInfo.phone" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="phonename">
                            <el-input placeholder="新联系人" v-model="userInfo.phonename" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-input class="-mt-4" placeholder="新邮箱" v-model="userInfo.email" />
                </el-form-item>
                <el-form-item>
                    <el-input class="mt-0" placeholder="新头像（输入头像网址链接）" v-model="userInfo.avatar" />
                </el-form-item>
                <el-form-item>
                    <el-button class="w-full" type="primary" native-type="submit">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <app-icon icon="heroicons-solid:lock-closed"/>
                        </span>
                        修改用户信息
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="w-full" @click="toUserListPage">
                        返回用户列表
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { ElMessage } from 'element-plus'
import AppIcon from '@/components/common/AppIcon.vue'

let userInfoJSON

if (localStorage.getItem('user') == null) {
  ElMessage({
    message: 'Error Token',
    type: 'warning',
  })
  router.push({ name: 'Login' })
}

if (JSON.parse((localStorage as any).getItem('user')).token !== '') {
  userInfoJSON = JSON.parse((localStorage as any).getItem('user'))
}

console.log(userInfoJSON)

const userInfo = reactive({
    username: userInfoJSON.username,
    phone: '',
    phonename: '',
    email: '',
    avatar: ''
})

const rules = {
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        }
    ],
}

const toChangeUserPasswordPage = () => {
    router.push({ name: '修改密码' })
}

const toUserListPage = () => {
    router.push({ name: '用户列表' })
}

const formEl = ref<HTMLFormElement | null>(null)

const handleSubmit = (e:Event) => {
    e.preventDefault()
    formEl.value!.validate().then(async (ok:boolean) => {
        if (!ok) return
        console.log(userInfo)
    })
}
</script>

<style scoped>
.row-wrapper {
    @apply -mb-4;
}
</style>