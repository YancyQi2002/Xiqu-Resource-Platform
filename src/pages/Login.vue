<script setup lang="ts">
import { ElMessage } from 'element-plus'
import axios from 'axios'
import useUserStore from '@/store/module/useUserStore'
import { OK_CODE } from '@/utils/keys'

const userInfo = reactive({
  username: '',
  password: '',
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
}

const formEl = ref<HTMLFormElement | null>(null)

const router = useRouter()

const userStore = useUserStore()

const handleSubmit = (e: Event) => {
  e.preventDefault()
  formEl.value!.validate().then(async (ok: boolean) => {
    if (!ok)
      return
    axios({
      method: 'POST',
      url: '/api/users/login',
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
    }).then((res) => {
      console.log(res.data)
      if (res.data.code === OK_CODE) {
        ElMessage.success(res.data.msg)
        userStore.login(Object.assign({}, res.data.data.info, { token: res.data.data.token }))
        localStorage.setItem('token', res.data.data.token)
        router.push({ name: '控制面板' })
        return
      }
      ElMessage({
        message: `Error ${res.data.message}`,
        type: 'warning',
      })
    }).catch((err) => {
      console.log(err)
      ElMessage({
        message: `Error ${err}`,
        type: 'warning',
      })
    })
  })
}

const toHomePage = () => {
  router.push({ name: '首页' })
}
</script>

<template>
  <div class="flex min-h-full items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow">
        <h2 class="mt-6 select-none text-center text-3xl font-extrabold text-gray-900">
          平台登录
        </h2>
      </div>
      <el-form ref="formEl" class="mt-8 space-y-6" :model="userInfo" :rules="rules" @submit="handleSubmit">
        <el-form-item prop="username">
          <el-input v-model="userInfo.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="userInfo.password" placeholder="密码" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" type="primary" native-type="submit">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <app-icon icon="heroicons-solid:lock-closed" />
            </span>
            登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" @click="toHomePage">
            返回平台主页
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>

</style>