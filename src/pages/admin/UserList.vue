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
                                            <td
                                                class="text-sm font-medium text-right whitespace-nowrap"
                                            >
                                                <a
                                                    href="#"
                                                    class="text-blue-600 dark:text-blue-500 hover:underline"
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

<script setup lang="ts">
import AdminCardBoxVue from '@/components/common/AdminCardBox.vue'
import { ElMessage } from 'element-plus'
import { getUserlist } from '@/utils/api'

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
]

let userlist :any = ref([])

async function getUserListData() {
    ElMessage({
        message: '正在加载后端数据 。。。',
        duration: 5000
    })

    const res = await (await fetch(getUserlist)).json()

    const result = res.data

    userlist.value = result
}

getUserListData()
</script>

<style scoped>
td {
    @apply py-4 px-6 text-lg text-center text-gray-500 whitespace-nowrap dark:text-gray-400;
}
</style>