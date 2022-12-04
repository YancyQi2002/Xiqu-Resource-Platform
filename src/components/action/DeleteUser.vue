<script setup lang="ts">
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { OK_CODE } from '@/utils/keys'

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
}
else if (localStorage.getItem('deleteUserInfo') !== null && localStorage.getItem('user') !== null) {
  userInfo = JSON.parse((localStorage as any).getItem('deleteUserInfo'))
}
else {
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
    username,
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
      let ret = ''
      for (const i in data)
        ret += `${encodeURIComponent(i)}=${encodeURIComponent(data[i])}&`

      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res: any) => {
    console.log(res.data)
    if (res.data.code === OK_CODE) {
      if (res.data.message === '管理员不可删除') {
        ElMessage({
          message: `Error ${res.data.message}`,
          type: 'warning',
        })
      }
      else {
        ElMessage.success(res.data.message)
        router.push({ name: '用户权限' })
      }
    }
  })
}
</script>

<template>
  <div class="flex min-h-full items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        >
        <h2 class="mt-6 select-none text-center text-3xl font-extrabold text-gray-900">
          删除用户
        </h2>
      </div>
      <div class="flex select-none items-center justify-center">
        您确定要删除用户 {{ userInfo.username }} 吗？
      </div>
      <div class="flex select-none items-center justify-center">
        <button
          class="focus:shadow-outline-indigo inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:border-indigo-700 focus:outline-none active:bg-indigo-700"
          @click="deleteUser(userInfo.username)"
        >
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>