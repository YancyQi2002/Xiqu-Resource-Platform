<script setup lang="ts">
import { ElMessage } from 'element-plus'
import router from '@/router'
import { dataURItoBlob } from '@/utils/dataURItoBlob'

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

const jingjuInfoData: any = []

let audioBlob: any

let synopsis = $ref('')

async function getJingjuInfo() {
  const res = await (await fetch(`/api/dramascript/jingjuinfo/${showInfoId}`)).json()

  console.log(res)

  const result = res.data

  const el: any = document.getElementById('audioId')

  if (res.code === 200) {
    if (result.audio === '')
      result.audio = '暂无音频资料！'

    synopsis = result.synopsis
    console.log(synopsis)

    jingjuInfoData.push(result)
  }

  if (jingjuInfoData[0].audio === '暂无音频资料！') {
    el.style.display = 'none';
    (document as any).getElementById('noAudioInfo').style.display = 'flex'
  }
  else {
    audioBlob = dataURItoBlob(jingjuInfoData[0].audio)
  }

  const blobUrl = window.URL.createObjectURL(audioBlob)

  el.src = blobUrl
  // el.addEventListener("canplay", () => {
  //     window.URL.revokeObjectURL(el.src)
  // })
}

onMounted(() => {
  getJingjuInfo()
})
</script>

<template>
  <div class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg">
    <div class="flex w-full items-center">
      <h5 class="my-4 px-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        剧目信息
      </h5>
      <div class="flex w-[85%] items-center justify-between">
        <div>
          <span class="px-2">
            {{ showJingjuInfoData.jingjuname }}
          </span>
          <span class="px-2">
            {{ showInfoId }}
          </span>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <tbody>
              <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <th
                  scope="col"
                  class="ct"
                >
                  创建时间
                </th>
                <td class="p-2">
                  {{ showJingjuInfoData.createTime }}
                </td>
              </tr>
              <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <th
                  scope="col"
                  class="ct"
                >
                  更新时间
                </th>
                <td class="p-2">
                  {{ showJingjuInfoData.updateTime }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- 条目简介 -->
  <div class="relative mt-4 overflow-x-auto bg-white shadow-md sm:rounded-lg">
    <article class="prose lg:prose-xl m-4 select-none">
      {{ synopsis }}
    </article>
  </div>

  <!-- 音频资料 -->
  <audio
    id="audioId"
    class="mt-4"
    controls
    src=""
    width="100"
  />
  <div
    id="noAudioInfo"
    class="relative mt-4 hidden h-10 select-none justify-center overflow-x-auto bg-white text-center shadow-md sm:rounded-lg"
  >
    <div class="mt-2 justify-center text-center">
      暂无音频资料！
    </div>
  </div>

  <!-- 唱词 / 剧本 -->
  <div class="h-full">
    <iframe
      v-if="showJingjuInfoData.content !== ''"
      class="mt-4 h-full w-full"
      :src="showJingjuInfoData.content"
      frameborder="0"
    />
    <div
      v-else
      class="relative mt-4 overflow-x-auto bg-white leading-[8rem] shadow-md sm:rounded-lg"
    >
      <div class="text-center">
        暂无唱词 / 剧本信息
      </div>
    </div>
  </div>
</template>

<style scoped>
.ct {
    @apply px-2 py-2 text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400;
}

article {
    @apply font-medium leading-10 text-2xl text-black;
    font-family: 'YSXK';
}
</style>