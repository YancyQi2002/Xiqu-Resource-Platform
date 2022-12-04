<script setup lang="ts">
import { ElMessage } from 'element-plus'
import axios from 'axios'
import router from '@/router'
import AppIcon from '@/components/common/AppIcon.vue'

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

// console.log(userInfoJSON)

const changeUserInfoUsername = (localStorage as any).getItem('changeUserInfoUsername')

if (userInfoJSON.username !== changeUserInfoUsername) {
  if (userInfoJSON.jurisdiction !== '1') {
    ElMessage({
      message: '您没有权限修改该用户信息',
      type: 'warning',
    })

    localStorage.removeItem('changeUserInfoUsername')
    router.push({ name: '用户列表' })
  }
}

const userInfo = reactive({
  username: changeUserInfoUsername,
  phone: '',
  phonename: '',
  email: '',
  avatar: '',
})

const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      message: '手机号不能为空',
      trigger: 'blur',
    },
  ],
  phonename: [
    {
      required: true,
      message: '联系人不能为空',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: '邮箱不能为空',
      trigger: 'blur',
    },
  ],
  avatar: [
    {
      required: true,
      message: '头像图片链接不能为空',
      trigger: 'blur',
    },
  ],
}

const toChangeUserPasswordPage = () => {
  router.push({ name: '修改密码' })
}

const toUserListPage = () => {
  localStorage.removeItem('changeUserInfoUsername')
  router.push({ name: '用户列表' })
}

const formEl = ref<HTMLFormElement | null>(null)

const handleSubmit = (e: Event) => {
  e.preventDefault()
  formEl.value!.validate().then(async (ok: boolean) => {
    if (!ok)
      return
    console.log(userInfo)
    const res = await axios('/api/users/changeUserInfo', {
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
    else {
      ElMessage({
        message: `${result.message}，即将跳转到用户列表页面`,
        type: 'success',
      })
      console.log(result.message)
      setTimeout(() => {
        localStorage.removeItem('changeUserInfoUsername')
        router.push({ name: '用户列表' })
      }, 3000)
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
          修改用户信息
        </h2>
      </div>
      <el-form
        ref="formEl"
        class="mt-8 space-y-6"
        :model="userInfo"
        :rules="rules"
        @submit="handleSubmit"
      >
        <el-row
          :gutter="24"
          class="row-wrapper"
        >
          <el-col :span="12">
            <el-form-item prop="username">
              <el-input
                v-model="userInfo.username"
                placeholder="用户名"
                disabled
              />
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
                <el-button
                  class="w-full"
                  type="primary"
                  @click="toChangeUserPasswordPage"
                >
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <AppIcon icon="heroicons-solid:lock-closed" />
                  </span>
                  修改密码
                </el-button>
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          :gutter="24"
          class="row-wrapper"
        >
          <el-col :span="12">
            <el-form-item prop="phone">
              <el-input
                v-model="userInfo.phone"
                placeholder="新手机号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="phonename">
              <el-input
                v-model="userInfo.phonename"
                placeholder="新联系人"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item prop="email">
          <el-input
            v-model="userInfo.email"
            class="-mt-4"
            placeholder="新邮箱"
          />
        </el-form-item>
        <el-form-item prop="avatar">
          <el-input
            v-model="userInfo.avatar"
            class="mt-0"
            placeholder="新头像（输入头像网址链接）"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="w-full"
            type="primary"
            native-type="submit"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <AppIcon icon="heroicons-solid:lock-closed" />
            </span>
            修改用户信息
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            class="w-full"
            @click="toUserListPage"
          >
            返回用户列表
          </el-button>
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