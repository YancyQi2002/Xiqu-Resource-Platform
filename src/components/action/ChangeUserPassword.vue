<script setup lang="ts">
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

let userInfoJSON

if (localStorage.getItem('user') == null) {
  ElMessage({
    message: 'Error Token',
    type: 'warning',
  })
  router.push({ name: 'Login' })
}

if (JSON.parse((localStorage as any).getItem('user')).token !== '')
  userInfoJSON = JSON.parse((localStorage as any).getItem('user'))

console.log(userInfoJSON)

const userInfo = reactive({
  username: userInfoJSON.username,
  password: '',
  newPassword: '',
})

const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
  ],
  newPassword: [
    {
      required: true,
      message: '新密码不能为空',
      trigger: 'blur',
    },
  ],
}

const formEl = ref<HTMLFormElement | null>(null)

const handleSubmit = (e: Event) => {
  e.preventDefault()
  formEl.value!.validate().then(async (ok: boolean) => {
    if (!ok)
      return
    console.log(userInfo)
    const res = await axios('/api/users/changeUserPassword', {
      method: 'POST',
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
    })

    const result = res.data
    if (result.code !== 200) {
      ElMessage({
        message: result.message,
        type: 'warning',
      })
      console.log(result.message)
    }

    if (result.code === 200) {
      if (result.message === '您输入的新密码与原密码相同') {
        ElMessage({
          message: result.message,
          type: 'warning',
        })
        console.log(result.message)
      }
      else {
        ElMessage({
          message: `${result.message}，即将跳转到后台登录页面`,
          type: 'success',
        })
        console.log(result.message)
        // 设置时间延迟 5 秒
        setTimeout(() => {
          router.push({ name: 'Login' })
        }, 5000)
      }
    }
  })
}

const toAdminHomePage = () => {
  router.push({ path: '/admin' })
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
          修改密码
        </h2>
      </div>
      <el-form
        ref="formEl"
        class="mt-8 space-y-6"
        :model="userInfo"
        :rules="rules"
        @submit="handleSubmit"
      >
        <el-form-item prop="username">
          <el-input
            v-model="userInfo.username"
            placeholder="用户名"
            disabled
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="userInfo.password"
            placeholder="原密码"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input
            v-model="userInfo.newPassword"
            placeholder="新密码"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="w-full"
            type="primary"
            native-type="submit"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <app-icon icon="heroicons-solid:lock-closed" />
            </span>
            修改密码
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            class="w-full"
            @click="toAdminHomePage"
          >
            返回后台主页
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>

</style>