<template>
    <div class="w-full h-full">
        <AdminCardBoxVue>
            <template #header>
                <h4 class="font-bold text-xl">用户列表</h4>
            </template>
            <template #default>
                <el-table
                    :data="userListData"
                    border
                >
                    <el-table-column v-for="item in columns" :label="item.label" :prop="item.prop"></el-table-column>
                </el-table>
            </template>
        </AdminCardBoxVue>
    </div>
</template>

<script setup lang="ts">
import AdminCardBoxVue from '@/components/common/AdminCardBox.vue'
import { inject, onMounted } from 'vue'

const columns = [
    {
        label: '用户名',
        prop: 'username'
    },
    {
        label: '权限',
        prop: 'jurisdiction'
    },
    {
        label: 'ID',
        prop: '_id'
    },
]

const axios:any = inject('axios')

interface Userlist {
  _id:string
  username:string
  password:string
  userId:string
  jurisdiction:string
  phone:string
  phonename:string
  avatar:string
  createTime:string
  updateTime:string
}

let userListData:Userlist = [
    {
        "_id": "616c06f9821312078fe75677",
        "username": "admin",
        "password": "admin",
        "userId": "616c06f9821312078fe75676",
        "jurisdiction": "1",
        "phone": "$2b$10$Y9mXLI0QxKpsCbwSmcSvzuEVtDi4knxKZpwinBM7.hjyC6ftcdAu2",
        "phonename": "Admin",
        "avatar": "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        "createTime": "2021-10-01T16:00:00.000Z",
        "updateTime": "2021-10-01T16:00:00.000Z",
    }
]

const getUserlist = () => {
    axios.get('/api/users/list').then((response: { data:any }) => {
        console.log(response)
        userListData = response.data
        console.log(userListData)
    })
}

console.log(userListData)
</script>

<style scoped></style>
