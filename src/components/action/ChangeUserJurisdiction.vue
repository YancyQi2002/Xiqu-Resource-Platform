<script setup lang="ts">
import router from '@/router'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

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

const dialogVisible = ref(false)

let isTrue = false

const handleClose = (done: () => void) => {
    ElMessageBox.confirm(
        '是否取消修改?',
        {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
        }
    ).then(() => {
        done()
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: 'Change canceled',
        })
    })
}

const changeIsTrue = async () => {
    isTrue = true
    dialogVisible.value = false
    const res = await axios('/api/users/changeUserJurisdiction', {
        method: 'POST',
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
    })

    let result = res.data
    if (result.code !== 200) {
        ElMessage({
            message: result.message,
            type: 'warning',
        })
        console.log(result.message)
    }

    if (result.code === 200) {
        ElMessage({
            message: result.message + '，即将跳转到用户权限列表页面',
            type: 'success',
        })
        console.log(result.message)
        setTimeout(() => {
            localStorage.removeItem('changeUserJurisdictionInfo')
            router.push({ name: '用户权限' })
        }, 5000)
    }
}

const formEl = ref<HTMLFormElement | null>(null)

const handleSubmit = (e: Event) => {
    e.preventDefault()
    formEl.value!.validate().then(async (ok: boolean) => {
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
        dialogVisible.value = true
    })
}

const toUserJurisdictionPage = () => {
    localStorage.removeItem('changeUserJurisdictionInfo')
    router.push({ name: '用户权限' })
}
</script>

<template>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow" />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 select-none">修改用户权限</h2>
            </div>
            <el-form class="mt-8 space-y-6" :model="userInfo" :rules="rules" @submit="handleSubmit" ref="formEl">
                <el-form-item prop="username" label="用户">
                    <el-input placeholder="用户名" v-model="userInfo.username" disabled />
                </el-form-item>
                <el-form-item prop="jurisdiction" label="权限">
                    <el-radio-group v-model="userInfo.jurisdiction">
                        <el-radio label="普通用户" />
                        <el-radio label="管理员" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button class="w-full" type="primary" native-type="submit">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <app-icon icon="heroicons-solid:lock-closed" />
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
    <el-dialog v-model="dialogVisible" title="提示" width="30%" :before-close="handleClose">
        <span class="text-xl font-bold">确定对该用户的权限进行修改？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="changeIsTrue">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>
</style>