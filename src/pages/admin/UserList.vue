<script setup lang="ts">
import AdminCardBoxVue from '@/components/common/AdminCardBox.vue'
import { ElMessage } from 'element-plus'
import { getUserlist } from '@/utils/api'
import router from '@/router'

const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'name',
    },
    {
        title: '权限',
        dataIndex: 'jurisdiction',
        key: 'jurisdiction',
    },
    {
        title: 'ID',
        dataIndex: '_id',
        key: '_id'
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime'   
    }
]

let userlist :any = ref([])

async function getUserListData() {
    ElMessage({
        message: '正在加载后端数据 。。。',
        duration: 5000
    })

    const res = await (await fetch(getUserlist)).json()

    const result = res.data

    console.log(res.data)

    for (let i = 0; i < result.length; i++) {
        let id = result[i]._id
        const before = id.substr(0, 4)
        const after = id.substr(20, 4)
        result[i]._id = before + '****' + after

        // window.innerWidth 判断窗口中可视区域 (viewpoint) 的宽度 显示不同的格式
        const createYear = result[i].createTime.substr(0, 4)
        const createMonth = result[i].createTime.substr(5, 2)
        const createDay = result[i].createTime.substr(8, 2)
        if (window.innerWidth < 1354 && window.innerWidth > 810) {
            result[i].createTime = createYear + "-" + createMonth + "-" + createDay
        } else if (window.innerWidth <= 810) {
            result[i].createTime = createYear + "." + createMonth + "." + createDay
        } else {
            result[i].createTime = createYear + "年" + createMonth + "月" + createDay + "日"
        }
        const updateYear = result[i].updateTime.substr(0, 4)
        const updateMonth = result[i].updateTime.substr(5, 2)
        const updateDay = result[i].updateTime.substr(8, 2)
        if (window.innerWidth < 1354 && window.innerWidth > 810) {
            result[i].updateTime = updateYear + "-" + updateMonth + "-" + updateDay
        } else if (window.innerWidth <= 810) {
            result[i].updateTime = updateYear + "." + updateMonth + "." + updateDay
        } else {
            result[i].updateTime = updateYear + "年" + updateMonth + "月" + updateDay + "日"
        }

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

const changeUserInfo = (username: string) => {
    console.log('====== changeUserInfo ======')
    localStorage.setItem('changeUserInfoUsername', username)
    router.push({ path: '/admin/changeUserInfo' })
}
</script>

<template>
    <div class="w-full h-full">
        <AdminCardBoxVue>
            <template #header>
                <h4 class="font-bold text-xl">用户列表</h4>
            </template>
            <template #default>
                <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hidden shadow-md sm:rounded-lg">
                                <table class="min-w-full">
                                    <thead class="bg-gray-100 dark:bg-gray-700">
                                        <tr>
                                            <th
                                                v-for="item in columns"
                                                scope="col"
                                                class="py-3 px-6 text-base text-center font-bold tracking-wider text-gray-700 uppercase dark:text-gray-400"
                                            >{{ item.title }}</th>
                                            <th scope="col" class="relative py-3 px-6">
                                                <span class="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="item in userlist"
                                            class="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600"
                                        >
                                            <td>{{ item.username }}</td>
                                            <td>{{ item.jurisdiction }}</td>
                                            <td>{{ item._id }}</td>
                                            <td>{{ item.createTime }}</td>
                                            <td>{{ item.updateTime}}</td>
                                            <td
                                                class="text-sm font-medium text-right whitespace-nowrap"
                                            >
                                                <a
                                                    @click="changeUserInfo(item.username)"
                                                    class="text-blue-600 dark:text-blue-500 hover:cursor-pointer"
                                                >Edit</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </AdminCardBoxVue>
    </div>
</template>

<style scoped>
td {
    @apply py-4 px-6 text-lg text-center text-gray-500 whitespace-nowrap dark:text-gray-400;
}
</style>