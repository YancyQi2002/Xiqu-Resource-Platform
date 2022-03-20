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
                                                class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
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
                                            <td
                                                class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >{{ item.username }}</td>
                                            <td
                                                class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400"
                                            >{{ item.jurisdiction }}</td>
                                            <td
                                                class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400"
                                            >{{ item._id }}</td>
                                            <td
                                                class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap"
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
import { reactive } from 'vue'

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
    }
]

let userlist = reactive([
    {
        "_id": "62315a8ba9f0820a556d8c21",
        "avatar": "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        "createTime": "2022-03-15T12:00:00.000Z",
        "jurisdiction": "1",
        "password": "$2b$10$JyfQ7tOOf4AMBFgyu7eIa.0uLyGnkwfEP8kdB685k/6QVXxKhuOKO",
        "phone": "19816316003",
        "phonename": "Admin",
        "updateTime": "2022-03-15T12:00:00.000Z",
        "userId": "62315fdca9f0820a556d8c22",
        "username": "admin",
        "email": "xiaoyixiu2002@gmail.com"
    }
])

fetch('/users/list').then((res) => res.json()).then((res) => {
    console.log(res.data)
    userlist = res.data
    console.log(userlist)
})
</script>

<style scoped></style>
