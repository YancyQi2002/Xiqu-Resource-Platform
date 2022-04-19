<template>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 select-none">修改用户权限</h2>
            </div>
            <el-form
                class="mt-8 space-y-6"
                :model="userInfo"
                :rules="rules"
                @submit="handleSubmit"
                ref="formEl"
            >
                <el-form-item prop="username" label="用户">
                    <el-input placeholder="用户名" v-model="userInfo.username" disabled />
                </el-form-item>
                <el-form-item label="权限">
                    <el-radio-group v-model="userInfo.jurisdiction">
                        <el-radio label="普通用户" />
                        <el-radio label="管理员" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button class="w-full" type="primary" native-type="submit">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <app-icon icon="heroicons-solid:lock-closed"/>
                        </span>
                        修改用户权限
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="w-full" @click="toUserJurisdictionPage">
                        返回用户权限列表
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { ElMessage } from 'element-plus'

let userInfoJSON

if (localStorage.getItem('user') == null) {
  ElMessage({
    message: 'Error Token',
    type: 'warning',
  })
  router.push({ name: 'Login' })
}

if (JSON.parse((localStorage as any).getItem('user')).token !== '') {
  if (JSON.parse((localStorage as any).getItem('changeUserJurisdictionInfo')) !== null) {
    userInfoJSON = JSON.parse((localStorage as any).getItem('changeUserJurisdictionInfo'))
  } else {
      ElMessage({
        message: 'Error changeUserJurisdictionInfo',
        type: 'warning',
    })
    router.push({ name: '用户权限' })
  }
} else {
  ElMessage({
    message: 'Error Token',
    type: 'warning',
  })
  router.push({ name: 'Login' })
}

console.log(userInfoJSON)

const userInfo = reactive({
    username: userInfoJSON.username,
    jurisdiction: userInfoJSON.jurisdiction
})

const rules = {
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        }
    ],
    jurisdiction: [
        {
            required: true,
            message: '权限不能为空',
            trigger: 'blur'
        }
    ]
}

const formEl = ref<HTMLFormElement | null>(null)

const handleSubmit = (e:Event) => {
    e.preventDefault()
    formEl.value!.validate().then(async (ok:boolean) => {
        if (!ok) return
        if (userInfo.jurisdiction === '普通用户') {
            userInfo.jurisdiction = 0
        } else if (userInfo.jurisdiction === '管理员') {
            userInfo.jurisdiction = 1
        } else {
            ElMessage({
                message: 'Error jurisdiction',
                type: 'warning',
            })
            return
        }
        console.log(userInfo)
    })
}

const toUserJurisdictionPage = () => {
    localStorage.removeItem('changeUserJurisdictionInfo')
    router.push({ name: '用户权限' })
}
</script>

<style scoped>

</style>