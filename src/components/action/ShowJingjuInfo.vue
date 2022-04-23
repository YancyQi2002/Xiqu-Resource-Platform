<script setup lang="ts">
import router from '@/router'
import { ElMessage } from 'element-plus'

if (localStorage.getItem('user') == null || localStorage.getItem('showInfoId') == null) {
    ElMessage({
        message: 'Error Token',
        type: 'warning',
    })
    router.push({ name: 'Login' })
}

const showInfoId = localStorage.getItem('showInfoId')
const showJingjuInfo: any = localStorage.getItem('showJingjuInfo')
const showJingjuInfoData = JSON.parse(showJingjuInfo)
console.log(showJingjuInfoData)

// let jingjuInfoData: any = reactive([])
//
// async function getJingjuInfo() {
//     const res = await (await fetch('/api/dramascript/jingjuinfo/' + showInfoId)).json()
//
//     console.log(res)
//
//     let result = res.data
//
//     if (res.code === 200) {
//         console.log(result)
//         jingjuInfoData.push(JSON.parse(JSON.stringify(result)))
//         jingjuInfoData = JSON.parse(JSON.stringify(jingjuInfoData))
//         console.log(jingjuInfoData)
//     }
// }
//
// getJingjuInfo()
</script>

<template>
    <div class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg">
        <div class="flex items-center w-full">
            <h5 class="my-4 px-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">剧目信息</h5>
            <div class="flex items-center justify-between w-[85%]">
                <div>
                    <span class="px-2">
                        {{ showJingjuInfoData.jingjuname }}
                    </span>
                    <span class="px-2">
                        {{ showInfoId }}
                    </span>
                </div>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="col" class="ct">
                                    创建时间
                                </th>
                                <td class="px-2 py-2">
                                    {{ showJingjuInfoData.createTime }}
                                </td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="col" class="ct">
                                    更新时间
                                </th>
                                <td class="px-2 py-2">
                                    {{ showJingjuInfoData.updateTime }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <iframe class="mt-4 w-full h-full" :src="showJingjuInfoData.content" frameborder="0"></iframe>
</template>

<style scoped>
.ct {
    @apply px-2 py-2 text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400;
}
</style>