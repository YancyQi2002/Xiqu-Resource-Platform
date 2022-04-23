<script setup lang="ts">
import AdminCardBoxVue from '@/components/common/AdminCardBox.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import router from '@/router'
import { getUserlist } from '@/utils/api'
import { ElMessage } from 'element-plus'

if (localStorage.getItem('user') == null) {
  ElMessage({
    message: 'Error Token',
    type: 'warning',
  })
  router.push({ name: 'Login' })
}

let userInfoJSON

if (JSON.parse((localStorage as any).getItem('user')).token !== '') {
  userInfoJSON = JSON.parse((localStorage as any).getItem('user'))
}

let userInfoJurisdiction = userInfoJSON.jurisdiction

console.log("当前用户权限：" + userInfoJurisdiction)

let userlist = ref([])

const search = ref('')

async function getUserListData() {
    ElMessage({
        message: '正在加载后端数据 。。。',
        duration: 5000
    })

    const res = await (await fetch(getUserlist)).json()

    const result = res.data

    for (let i = 0; i < result.length; i++) {
        let id = result[i]._id
        const before = id.substr(0, 4)
        const after = id.substr(20, 4)
        result[i]._id = before + '****' + after

        // 判断 jurisdiction 是否为 1
        if (result[i].jurisdiction === '0') {
            result[i].jurisdiction = '普通用户'
        } else if (result[i].jurisdiction === '1') {
            result[i].jurisdiction = '管理员'
        } else {
            result[i].jurisdiction = '未知'
        }
    }

    userlist.value = result
}

getUserListData()

const handleEdit = (index: number, row: any) => {
    console.log('====== changeUserJurisdiction ======')
    console.log(index, row)
    let editEl = (document as any).getElementById('edit-jurisdiction')
    if (userInfoJurisdiction !== '1') {
        ElMessage({
            message: '您的权限不足，无法对用户权限进行修改',
            type: 'warning',
            duration: 3000
        })
        editEl.disabled = true
        editEl.classList.add('is-disabled')
    } else {
        editEl.disabled = false
        editEl.classList.remove('is-disabled')
        let changeUserJurisdictionInfo = JSON.stringify(row)
        localStorage.setItem('changeUserJurisdictionInfo', changeUserJurisdictionInfo)
        router.push({ path: '/admin/changeUserJurisdiction' })
    }
}
</script>

<template>
    <div class="w-full h-full">
        <AdminCardBoxVue>
            <template #header>
                <h4 class="font-bold text-xl">用户权限</h4>
            </template>
            <template #default>
                <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hidden shadow-md sm:rounded-lg">
                                <el-input v-model="search" size="large" placeholder="输入需要查找的用户名">
                                    <template #prepend>
                                        <el-button type="text" size="large">
                                            <app-icon icon="icon-park:search" class="cursor-default"></app-icon>
                                        </el-button>
                                    </template>
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col">
                    <el-table :data="userlist.filter(
                        (data: any) =>
                            !search || data.username.toLowerCase().includes(search.toLowerCase()
                            )
                    )" stripe highlight-current-row style="width: 100%">
                        <el-table-column type="index" width="50" align="center" />
                        <el-table-column prop="_id" label="ID" align="center" />
                        <el-table-column prop="username" label="用户名" align="center" />
                        <el-table-column prop="jurisdiction" label="权限" align="center" />
                        <el-table-column label="Operations" align="center">
                            <template #default="scope">
                                <el-button id="edit-jurisdiction" type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">
                                    Edit
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </template>
        </AdminCardBoxVue>
    </div>
</template>

<style scoped>
</style>