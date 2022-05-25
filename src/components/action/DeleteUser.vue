<script setup lang="ts">
import router from '@/router'
import { OK_CODE } from '@/utils/keys'
import axios from 'axios'
import { ElMessage } from 'element-plus'

if (localStorage.getItem('user') == null) {
    ElMessage({
        message: 'Error Token',
        type: 'warning',
    })
    router.push({ name: 'Login' })
}

console.log(localStorage.getItem('user'))
console.log(localStorage.getItem('deleteUserInfo'))

let userInfo: any

if (localStorage.getItem('deleteUserInfo') === null) {
    userInfo = JSON.parse((localStorage as any).getItem('user'))
} else if (localStorage.getItem('deleteUserInfo') !== null && localStorage.getItem('user') !== null) {
    userInfo = JSON.parse((localStorage as any).getItem('deleteUserInfo'))
} else {
    ElMessage({
        message: 'Error',
        type: 'warning',
    })
    router.push({ name: '控制面板' })
}
console.log(userInfo)

const deleteUser = (username: string) => {
    console.log('====== 确认删除用户 ====== ')
    console.log(username)
    const userInfo = {
        username: username
    }
    console.log('====== 访问 API ====== ')
    ElMessage({
        message: '删除用户中 · · ·',
        type: 'warning',
    })
    axios({
        method: 'POST',
        url: '/api/users/deleteUser',
        data: userInfo,
        transformRequest: [(data) => {
            let ret = ""
            for (let i in data) {
                ret += encodeURIComponent(i) + "=" + encodeURIComponent(data[i]) + "&"
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((res: any) => {
        console.log(res.data)
        if (res.data.code === OK_CODE) {
            if (res.data.message == '管理员不可删除') {
                ElMessage({
                    message: 'Error ' + res.data.message,
                    type: 'warning',
                })
            } else {
                ElMessage.success(res.data.message)
                router.push({ name: '用户权限' })
            }
        }
    })
}
</script>

<template>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow" />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 select-none">删除用户</h2>
            </div>
            <div class="flex items-center justify-center select-none">
                您确定要删除用户 {{ userInfo.username }} 吗？
            </div>
            <div class="flex items-center justify-center select-none">
                <button
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                    @click="deleteUser(userInfo.username)">确定</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>