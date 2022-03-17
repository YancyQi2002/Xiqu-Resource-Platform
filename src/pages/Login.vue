<template>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 select-none">平台登录</h2>
            </div>
            <el-form
                class="mt-8 space-y-6"
                :model="userInfo"
                :rules="rules"
                @submit="handleSubmit"
                ref="formEl"
            >
                <el-form-item prop="username">
                    <el-input placeholder="用户名" v-model="userInfo.username" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="密码" type="password" v-model="userInfo.password" show-password />
                </el-form-item>
                <el-form-item>
                    <el-button class="w-full" type="primary" native-type="submit">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <app-icon icon="heroicons-solid:lock-closed"/>
                        </span>
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/module/useUserStore'
import { OK_CODE } from '@/utils/keys'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { reqUserLogin } from '@/api/userApi'
import axios from 'axios'

const userInfo = reactive({
    username: '',
    password: ''
})

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
    ]
}

const formEl = ref<HTMLFormElement | null>(null)

const router = useRouter()

const userStore = useUserStore()

const handleSubmit = (e:Event) => {
    e.preventDefault()
    formEl.value!.validate().then(async (ok:boolean) => {
        if (!ok) return
        // let { code, data, msg } = await reqUserLogin(userInfo)
        axios({
            method: "POST",
            url: "/api/users/login",
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
                userStore.login(Object.assign({}, res.data.data.info, { token: res.data.data.token }))
                router.push({ name: '控制面板' })
            }
            ElMessage.error(res.data.msg)
        })
    })
}
</script>

<style scoped>

</style>