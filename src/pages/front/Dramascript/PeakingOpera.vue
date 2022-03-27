<template>
  <el-card class="mb-3" shadow="never">
    <el-row class="flex items-center justify-center">
      <div class="pt-2">本版块收录 北京歌剧 资源。</div>
      <button
        class="p-2 text-blue-500 border-2 border-sky-500 rounded-md cursor-default"
      >不含剧照等图片资源</button>
    </el-row>
  </el-card>

  <el-table
    :data="tabledata.filter(
      (data :any) =>
        !search || data.PeakingOperaName.toLowerCase().includes(search.toLowerCase()) || data.actor.toLowerCase().includes(search.toLowerCase())
    )"
    border
    highlight-current-row
    style="width: 100%"
  >
    <el-table-column type="index" sortable width="60" align="center" label="索引"></el-table-column>

    <el-table-column prop="PeakingOperaId" align="center" label="序号"></el-table-column>

    <el-table-column prop="PeakingOperaName" align="center" label="剧目"></el-table-column>

    <el-table-column prop="screenWriter" align="center" label="编剧"></el-table-column>

    <el-table-column prop="actor" align="center" label="演员"></el-table-column>

    <el-table-column prop="createTime" sortable align="center" label="创建时间"></el-table-column>

    <el-table-column prop="updateTime" sortable align="center" label="更新时间"></el-table-column>

    <el-table-column type="expand" width="300">
      <template v-slot:header="scope">
        <el-input v-model="search" size="small" placeholder="输入剧目/演员搜索" clearable />
      </template>

      <template v-slot="props">
        <el-form label-position="left" class="px-4">
          <el-form-item label="条目简介">
            <span>{{ props.row.synopsis }}</span>
          </el-form-item>
          <el-form-item label="音频资料">
            <span v-if="props.row.audio !== '暂无音频资料！'">
              <audio controls :src="props.row.audio"></audio>
            </span>
            <span v-else>{{ props.row.audio }}</span>
          </el-form-item>
          <el-form-item label="视频资料">
            <span v-if="props.row.video !== '暂无视频资料！'" class="w-full">
              <iframe
                class="mt-2"
                width="100%"
                height="500"
                :src="props.row.video"
                scrolling="no"
                border="0"
                frameborder="no"
                framespacing="0"
                allowfullscreen="true"
              ></iframe>
            </span>
            <span v-else>{{ props.row.video }}</span>
          </el-form-item>
          <el-form-item label="视频解说">
            <span v-if="props.row.dramaInterpretation !== '暂无解说！'" class="w-full">
              <iframe
                class="mt-2"
                width="100%"
                height="500"
                :src="props.row.dramaInterpretation"
                scrolling="no"
                border="0"
                frameborder="no"
                framespacing="0"
                allowfullscreen="true"
              ></iframe>
            </span>
            <span v-else>{{ props.row.dramaInterpretation }}</span>
          </el-form-item>
          <el-form-item label="剧本&nbsp;/&nbsp;唱词">
            <span>
              <a
                v-if="props.row.content !== '暂无唱词 / 剧本！'"
                class="btn btn-outline-info mt-2 no-underline"
                role="button"
                :href="props.row.content"
                target="_blank"
              >点此查看</a>
              <span v-else>暂无唱词 / 剧本！</span>
            </span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { getPeakingOperalist } from "@/utils/api"

let tabledata = ref([])

const search = ref('')

onMounted(() => {
  loadPeakingOperaList()
})

async function loadPeakingOperaList() {
  ElMessage({
    message: '正在加载后端数据 。。。',
    duration: 5000
  })

  const res = await (await fetch(getPeakingOperalist)).json()

  const result = res.data
  console.log(result)
  for (let i = 0; i < result.length; i++) {

    // 618a4d52fd52ea67527f3bde ==> 618a****3bde
    let id = result[i].PeakingOperaId
    const before = id.substr(0, 4)
    const back = id.substr(20, 4)
    result[i].PeakingOperaId = before + "****" + back

    // YYYY 年 MM 月 DD 日
    // YYYY - MM - DD
    // YYYY . MM . DD
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

    if (result[i].synopsis == "") {
      result[i].synopsis = "暂无简介！"
    }

    if (result[i].audio == "") {
      result[i].audio = "暂无音频资料！"
    }

    if (result[i].video == "") {
      result[i].video = "暂无视频资料！"
    }

    if (result[i].dramaInterpretation == "") {
      result[i].dramaInterpretation = "暂无解说！"
    }

    if (result[i].content == "") {
      result[i].content = "暂无唱词 / 剧本！"
    }

  }

  tabledata.value = result
}
</script>

<style scoped>
.search {
  @apply mr-2 w-4 h-4;
}
</style>